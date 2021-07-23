# Advanced Demo - Migrating a database with the Database MIgration Service

In this advanced demo you will be migrating a simple web application (wordpress) from an on-premises environment into AWS.  
The on-premises environment is a virtual web server (simulated using EC2) and a self-managed mariaDB database server (also simulated via EC2)  
You will be migrating this into AWS and running the architecture on an EC2 webserver and RDS managed SQL database.  

This advanced demo consists of 6 stages :-

- STAGE 1 : Provision the environment and review tasks **<= THIS STAGE**
- STAGE 2 : Establish Private Connectivity Between the environments (VPC Peer)
- STAGE 3 : Create & Configure the AWS Side infrastructure (App and DB)
- STAGE 4 : Migrate Database & Cutover
- STAGE 5 : Cleanup the account

![StageArchitecture](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE1.png)

# STAGE 1A - Infrastructure Creation

Click https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-dms-database-migration/DMS.yaml&stackName=DMS to apply the base lab infrastructure  

You should take note of the `parameter` values 

- DBName
- DBPassword
- DBRootPassword
- DBUser

You will need all of these in later stages.  
All defaults should be pre-populated, you just need to scroll to the bottom, check the capabilities box and click `Create Stack`  

# STAGE 1 - FINISH   

Once the stack is in the `CREATE_COMPLETE` status you will have a simulated `on-premises` environment and an AWS environment.
Move to the EC2 console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1  
Click `Running Instances`  
Select the `CatWEB` instance  
Copy down its `Public IPv4 DNS` into your clipboard and open it in a new tab.  
You should see the `Animals4life Hall of Fame` load... this is running from the simulated onpremises environment using the CatDB mariaDB instance.  


