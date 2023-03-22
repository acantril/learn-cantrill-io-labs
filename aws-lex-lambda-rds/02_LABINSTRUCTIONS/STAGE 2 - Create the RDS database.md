# Lex-Lambda-RDS Demo

To complete this stage, you will need to have the CloudFormation stack deployed. If you have not done it yet, please follow the section `1-Click Install` in the [README](../README.md) file.

In this part of the DEMO, you will be creating the following:

- A RDS database that will be used to store the appointments information

# STAGE 2 - Create the RDS database

Navigate to the RDS console: https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1

In the left-hand side menu, click on **"Databases"**.

Click the **"Create database"** button.

Select **"Standard create"** as the database creation method.

Select **"MySQL"** as the engine type.

Select **"MySQL 8.0.32"** as the engine version.

Select **"Free tier"** as the template.

Enter **"animal-grooming-db"** as the database name in the **"DB instance identifier"** field under the **"Settings"** section.

Enter **"admin"** as the master username in the **"Master username"** field under the **"Settings"** section.

Enter **"qU21OXk8**" as the database password for the master user in the **"Master password"** field under the **"Settings"** section. Repeat the password in the **"Confirm database password"** field.

In the **"Instance configuration"** section select the **"Burstable classes (includes t classes)"** as the **"DB instance class"** and select the **"db.t3.micro"** instance type.

In the **"Storage"** section uncheck the **"Enable storage autoscaling"** checkbox, set the **"Allocated storage"** to **"20"** and the **"Storage type"** to **"General Purpose (SSD) (gp2)"**.

In the **"Connectivity"** section make the following changes:

- Change the **"Compute resource"** to **"Don't connect to an EC2 compute resource"**.

- Change the **"Network type"** to **"IPv4"**.

- Change the **"Virtual private cloud (VPC)"** to the VPC that was created by the CloudFormation stack (it will have the name **"A4L-AWS"**).

- Change the Public access setting to **"Yes"**.

- In the **"VPC security group (firewall)"** section, select the security group that was created by the CloudFormation stack. It will have a name with the following format: **"`<Stack Name>-SecurityGroupPublic-<Random String>`"**.

Leave the rest of the settings as they are and click the **"Create database"** button.

This will take a few minutes to complete. Once it is done, you will see in the **"Status"** column the value **"Available"**. Once the RDS database is in **"Available"** status, click on the database name to open the database details page. In the "**Connectivity & security**" section, locate the **"Endpoint"** field. Copy the value of the field somewhere safe as you will need it later.

While the database is being created, you can continue with the STAGE 3A.
