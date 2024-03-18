# Advanced Demo - Migrating a database with the Database MIgration Service

In this advanced demo you will be migrating a simple web application (wordpress) from an on-premises environment into AWS.  
The on-premises environment is a virtual web server (simulated using EC2) and a self-managed mariaDB database server (also simulated via EC2)  
You will be migrating this into AWS and running the architecture on an EC2 webserver and RDS managed SQL database.  

Architecture Link : INSERT THE LINK HERE

This advanced demo consists of 5 stages :-

- STAGE 1 : Provision the environment and review tasks 
- STAGE 2 : Establish Private Connectivity Between the environments (VPC Peer) 
- STAGE 3 : Create & Configure the AWS Side infrastructure (App and DB) 
- STAGE 4 : Migrate Database & Cutover **<= THIS STAGE**
- STAGE 5 : Cleanup the account

![StageArchitecture](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE4.png)

# STAGE 4A - CREATE THE DMS SUBNET GROUP

https://console.aws.amazon.com/dms/v2/home?region=us-east-1#subnetGroup  
Click `Create Subnet Group`  
For Name and Description use `A4LDMSSNGROUP`
for `VPC` choose `awsVPC`  
for `Add Subnets` choose `aws-privateA` and `aws-privateB`  
Click `Create subnet group` 
 

# STAGE 4B - CREATE THE DMS REPLICATION INSTANCE

Move to the DMS Console https://console.aws.amazon.com/dms/v2/home?region=us-east-1#replicationInstances  
Click `create Replication Instance`  
for name enter `A4LONPREMTOAWS`
use the same for `Description`  
for `Instance Class` choose `dms.t3.micro`  
for `VPC` choose `awsVPC`  
For `MultiAZ` make sure it's set to `dev or test workload (single AZ)`  
and for `Pubicly Accessible` uncheck the box  
Expand `Advanced security and network configuration`  
Ensure `a4ldmssngroup` is selected in `Replication subnet group`  
For `VPC security group(s)` choose `***-awsSecurityGroupDB-***`  
Click `Create`  

# STAGE 4C - CREATE THE DMS SOURCE ENDPOINT
Move to https://console.aws.amazon.com/dms/v2/home?region=us-east-1#endpointList  
Click `Create Endpoint`  
For `Endpoint type` choose `Source Endpoint` and make sure that `Select RDS DB Instance` is UNCHECKED  
Under `Endpoint configuration` set `Endpoint identifier` to be `CatDBOnpremises`  
Under `Source Engine` set `mariadb`  
Under `Access to endpoint database` choose `Provide access information manually`  
Under `Server name` use the privateIPv4 address of `CatDB` (get it from EC2 console)  
For port `3306`  
For username `a4lwordpress`  
for password user the DBPassword you noted down in stage 1  
click `create endpoint`  

# STAGE 4D - CREATE THE DMS DESTINATION ENDPOINT (RDS)  
Move to https://console.aws.amazon.com/dms/v2/home?region=us-east-1#endpointList  
Click `Create Endpoint`  
For `Endpoint type` choose `Target Endpoint`  
Check `Select RDS DB Instance`  
Select `a4lwordpress` in the dropdown  
It will prepopulate the boxes  
Under `Access to endpoint database` choose `Provide access information manually`  
For `Password` enter the DBPassword you noted down in stage1  
Scroll down and click `Create Endpoint`  

# STAGE 4E - TEST THE ENDPOINTS

**make sure the replication instance is ready**
Verify by going to `Replication Instances` and make sure the status is `Available`  
Go back to `Endspoints`  

Select the `a4lwordpress` endpoint, click `Actions` and then `Test Connections`  
Click `Run Test` and make sure after a few minutes the status moves to `successful`  
Go back to `Endpoints`  
Select the `catdbonpremises` endpoint, click `Actions` and then `Test Connections`  
Click `Run Test` and make sure after a few minutes the status moves to `successful`  

If both of these are successful you can continue to the next step.  

# STAGE 4F - Migrate
Move to migration tasks  https://console.aws.amazon.com/dms/v2/home?region=us-east-1#tasks  
Click `Create task`  
for `Task identifier` enter `A4LONPREMTOAWSWORDPRESS`
for `Replication instance` pick the replication instance you just created  
for `Source database endpoint` pick `catdbonpremises`  
for `Target database endpoint` pick `a4lwordpress`  
for `Migration type` pick `migrate existing data` **you could pick and replicate changes here if this were a high volume production DB**  
for `Table mappings` pick `Wizard`  
Click `Add new selection rule`  
in `Schema` box select `Enter a Schema`  
in `Schema Name` type `a4lwordpress`  
Scroll down and click `Create Task`  

This starts the replication task and does a full load from `catdbonpremises` to the RDS Instance.  
It will create the task  
then start the task  
then it will be in the `Running` State until it moves into `Load complete`  


At this point the data has been migrated into the RDS instance  

# STAGE 4G - Cutover the application instance

Move to the RDS Console https://console.aws.amazon.com/rds/home?region=us-east-1#  
Click `Databases`  
Click `a4lwordpress`  
under `Endpoint & Port` copy the `endpoint` dns name into your clipboard  

Move to the EC2 console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
Select the `awsCatWeb` instance, right click, `Connect`  
Select `Session Manager` and click `Connect`  
When connected type `sudo bash` to run a privileged bash shell
run `cd /var/www/html`
run `nano wp-config.php`  
locate the define DB_HOST line, and reolace the IP address with the RDS Host you just copied down into you clipboard  
run `ctrl+o` to save and `ctrl+x` to exit.  

Run the script below, to update the wordpress database with the new instance DNS name

```
#!/bin/bash
source <(php -r 'require("/var/www/html/wp-config.php"); echo("DB_NAME=".DB_NAME."; DB_USER=".DB_USER."; DB_PASSWORD=".DB_PASSWORD."; DB_HOST=".DB_HOST); ')
SQL_COMMAND="mysql -u $DB_USER -h $DB_HOST -p$DB_PASSWORD $DB_NAME -e"
OLD_URL=$(mysql -u $DB_USER -h $DB_HOST -p$DB_PASSWORD $DB_NAME -e 'select option_value from wp_options where option_id = 1;' | grep http)
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`
HOST=$(curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-hostname)
$SQL_COMMAND "UPDATE wp_options SET option_value = replace(option_value, '$OLD_URL', 'http://$HOST') WHERE option_name = 'home' OR option_name = 'siteurl';"
$SQL_COMMAND "UPDATE wp_posts SET guid = replace(guid, '$OLD_URL','http://$HOST');"
$SQL_COMMAND "UPDATE wp_posts SET post_content = replace(post_content, '$OLD_URL', 'http://$HOST');"
$SQL_COMMAND "UPDATE wp_postmeta SET meta_value = replace(meta_value,'$OLD_URL','http://$HOST');"
```

Move to the EC2 console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
Select `CatDB`, right click `stop instance`   
Move to the EC2 console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
Select `CatWeb`, right click `stop instance`   

Move to the EC2 console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
Select `awsCatWeb` and get its `Public IPv4 DNS` 
Open this in a new tab
It should still show the application ... this is now pointed at the RDS instance after a full migration

# STAGE 4 Finish

At this point you have created a VPC peer between the simulated On-premises environment and AWS
You have fully migrated the wordpress application files from on-premises (simulated) into AWS  
You have provisioned an RDS DB Instance  
And you have used DMS to perform a simple migration of the database from on-premises (simulated) to AWS  



