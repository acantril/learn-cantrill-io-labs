# Advanced Demo - Migrating a database with the Database MIgration Service

In this advanced demo you will be migrating a simple web application (wordpress) from an on-premises environment into AWS.  
The on-premises environment is a virtual web server (simulated using EC2) and a self-managed mariaDB database server (also simulated via EC2)  
You will be migrating this into AWS and running the architecture on an EC2 webserver and RDS managed SQL database.  

Architecture Link : INSERT THE LINK HERE

This advanced demo consists of 6 stages :-

- STAGE 1 : Provision the environment and review tasks 
- STAGE 2 : Establish Private Connectivity Between the environments (VPC Peer) 
- STAGE 3 : Create & Configure the AWS Side infrastructure (App and DB) **<= THIS STAGE**
- STAGE 4 : Migrate Database & Cutover
- STAGE 5 : Cleanup the account

![StageArchitecture](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE3.png)

# STAGE 3A - CREATE THE RDS INSTANCE

Move to the RDS Console https://console.aws.amazon.com/rds/home?region=us-east-1  
Click `Subnet Groups`  
Click `Create DB Subnet Group`  
For `Name` call it `A4LDBSNGROUP`
enter the same for description
in the `VPC` dropdown, choose `awsVPC`  
Under availability zones, choose `us-east-1a` and `us-east-1b`  
for subnets check the box next to `10.16.32.0/20` which is privateA and `10.16.96.0/20` which is privateB  
Scroll down and click `Create`  
Click on `Databases`  
Click `create Database`  
Choose `Standard Create`  
Choose `MariaDB`
Choose `Free Tier` for `Templates`  

You will be using the same database names and credentials to keep things simple for this demo lesson, but note that in production this could be different.

for `DB instance identifier` enter `a4lwordpress`  
for `Master username` choose `a4lwordpress`  
for `Masterpassword` enter the DBPassword parameter for cloudformation which you noted down in stage of this demo
enter that same password in the `Confirm password` box  
Scroll down to `Connectivity`  
for `Virtual private cloud (VPC)` choose `awsVPC`  
make sure `Subnet Groups` is set toe `a4ldbsngroup`  
for `public access` choose `No`  
for `VPC security groups` select `Choose Existing` and choose  `***-awsSecurityGroupDB-***` (*** aren't important)  
remove the `Default` security group by clicking the `X`    
Scroll down and expand `Additional configuration`  
Under `Initial database name` enter `a4lwordpress`  
Scroll down and click `Create Database`  

This will take some time.. and you cant continue to `Stage4` until the database is in a ready state.

# STAGE 3B - CREATE THE EC2 INSTANCE

Move to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:  
Click `Instances`  
Click `Launch Instances`  
Enter `awsCatWeb` for the Name of the instance.  
Clck `Amazon Linux` and ensure `Amazon Linux 2 AMI (HVM) ...... SSD Volume Type` is selected.  
Ensuring the architecture is set to `64-bit (x86)` below.    
Choose the `Free Tier eligable` instance (should be t2.micro or t3.micro)  
Scroll down and choose `Choose `Proceed without key pair (not recommended)` in the dropdown  
Next to `Network Settings` click `Edit`  
For `VPC` pick `awsVPC`  
For `Subnet` pick `aws-PublicA`  
Select `Select an existing security group`  
Choose `***-awsSecurityGroupWeb-***` (*** aren't important)  
Scroll down past Storage and expand `Advanced Details` (don't confuse this with `Advanced Network Configuration` in the current area)  
for `IAM Instance Profile` pick `***-awsInstanceProfile-****` (*** aren't important)  
Click `Launch Instance`  
Click `View All Instances`  

Wait for the `awsCatWeb` instance to be in a `Running` state with `2/2 checks` before continuing.

# STAGE 3C - INSTALL WORDPRESS Requirements

Select the `awsCatWeb` instance, right click, `Connect`  
Select `Session Manager` and click `Connect`  
When connected type `sudo bash` to run a privileged bash shell
then update the instance with a `yum -y update` and wait for it to complete.  
Then install the apache web server with `yum -y install httpd mariadb`  (the mariadb part is for the mysql tools)
Then install php with `amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2 `  
then make sure apache is running and set to run at startup with 

```
systemctl enable httpd
systemctl start httpd
```

You now have a running apache web server with the ability to connect to the wordpress database (currently running onpremises)

# STAGE 3D - MIGRATE WORDPRESS Content over

You're going to edit the SSH config on this machine to allow password authentication on a temporary basis.  
You will use this to copy the wordpress data across to the awsCatWeb machine from the on-premises CatWeb Machine  

run a `nano /etc/ssh/sshd_config`  
locate `PasswordAuthentication no` and change to `PasswordAuthentication yes` , then `ctrl+o` to save and `ctrl+x` to exit.  
then set a password on the ec2-user user  
run a `passwd ec2-user` and enter the `DBPassword` you noted down at the start of the demo.  
**this is only temporary.. we're using the same password throughout the demo to make things easier and less prone to mistakes**

restart SSHD to make those changes with `service sshd restart`  or `systemctl restart sshd`


Return back to the EC2 console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
with the `awsCatWeb` instance selected, note down its `Private IPV4 Address` you will need this in a moment.  

Select the `CatWeb` instance, right click, `Connect`  
Select `Session Manager` and click `Connect`  
When connected type `sudo bash` to run a privileged bash shell  

move to the webroot folder by typing `cd /var/www/`  

run a `scp -rp html ec2-user@privateIPofawsCatWeb:/home/ec2-user` and answer `yes` to the authenticity warning.  
this will copy the wordpress local files from `CatWeb` (on-premises) to `awsCatWeb` (aws)

**now move back to the `CatWeb` server, if you dont have it open still, reconnect as per below**

Select the `awsCatWeb` instance, right click, `Connect`  
Select `Session Manager` and click `Connect`  
When connected type `sudo bash` to run a privileged bash shell

move to the `ec2-user` home folder by doing a `cd /home/ec2-user`  
then do an `ls -la` and you should see the html folder you just copied.  
`cd html`  
next copy all of these files into the webroot of `awsCatWeb` by doing a `cp * -R /var/www/html/`


# STAGE 3E - Fix Up Permissions & verify `awsCatWeb` works

run the following commands to enforce the correct permissions on the files you've just copied across

```
usermod -a -G apache ec2-user   
chown -R ec2-user:apache /var/www
chmod 2775 /var/www
find /var/www -type d -exec chmod 2775 {} \;
find /var/www -type f -exec chmod 0664 {} \;
sudo systemctl restart httpd
```

Move to the EC2 running instances console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
Select the `awsCatWeb` instance  
copy down its `public IPv4 DNS` into your clipboard and open it in a new tab  
if working, this Web Instance (aws) is now loading using the on-premises database.


# STAGE 3 - FINISH   

At this point you have a functional AWS based wordpress application instance.  
You have migrated content from the on-premises virtual machine (simulated) using SCP.  
And you have tested that its connects to the on-premises DB.
In the next stage you will migrate the on-premises DB to AWS using DMS.
**before you continue, make sure the a4lwordpress RDS DB is in an Available state** https://console.aws.amazon.com/rds/home?region=us-east-1#databases:  
