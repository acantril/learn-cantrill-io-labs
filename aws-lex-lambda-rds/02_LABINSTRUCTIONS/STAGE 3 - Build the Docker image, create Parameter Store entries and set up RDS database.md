# Lex-Lambda-RDS Demo

To complete this stage, you will need to have the CloudFormation stack deployed. If you have not done it yet, please follow the section `1-Click Install` in the [README](../README.md) file.

In this part of the DEMO, you will be doing the following:

- Building the Docker image that will be used to deploy the web application

- Uploading the Docker image to the ECR repository

- Create database parameters in the Parameter Store

- Setting up the RDS database

# STAGE 3 - Build the Docker image, create Parameter Store entries and set up RDS database

## STAGE 3A - Build the Docker image

Navigate to the EC2 console: https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState

Click `Instances` in the left menu.

Locate and select the `AWS-EC2-Docker` instance.

Right-click and select `Connect`.

Select `Session Manager` and click `Connect`.

In the terminal window, enter the following commands:
   - `sudo amazon-linux-extras install docker -y`
   - `sudo service docker start`
   - `sudo usermod -a -G docker ec2-user`
   - `sudo su - ec2-user`
   - `unzip app.zip`

Next we are going to build and push the Docker image to the ECR repository. Enter the following commands replacing the `<AWS Account ID>` with the ID of your AWS account you copied in the previous step (you can find it in the upper-right corner of the AWS console):
   - Build the Docker image: `docker build -t animal-grooming-app .`
   - Tag the Docker image: `docker tag animal-grooming-app:latest <AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com/animal-grooming-repo:latest`
   - Login to the ECR repository: `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com`
    - Push the Docker image to the ECR repository: `docker push <AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com/animal-grooming-repo:latest`

## STAGE 3B - Create Parameter Store entries

To complete this stage, you will need to have the RDS database in a `Available` state. If you have not done it yet, please follow the section `STAGE 2 - Create the RDS database` in the [README](../README.md) file.

Navigate to the Systems Manager console: https://us-east-1.console.aws.amazon.com/systems-manager/home?region=us-east-1

In the left-hand side menu, click on **"Parameter Store"**.

We are going to create the following parameters:
  - `/appointment-app/prod/db-url`
  - `/appointment-app/prod/db-user`
  - `/appointment-app/prod/db-password`
  - `/appointment-app/prod/db-database`

To do so, click on **"Create parameter"**.

For the **"Name"** field, enter `/appointment-app/prod/db-url`.

For the **"Tier"** field, select **"Standard"**.

For the **"Type"** field, select **"String"**.

For the **"Data type"** field, select **"text"**.

For the **"Value"** field, enter the value of the RDS database endpoint you copied in the previous step.

Click **"Create parameter"**.

You will be redirected to the Parameter Store console where you will see the parameter you just created.

Click again on **"Create parameter"**.

For the **"Name"** field, enter `/appointment-app/prod/db-user`.

For the **"Tier"** field, select **"Standard"**.

For the **"Type"** field, select **"String"**.

For the **"Data type"** field, select **"text"**.

For the **"Value"** field, enter `admin`.

Click **"Create parameter"**.

You will be redirected to the Parameter Store console where you will see the parameter you just created.

Click again on **"Create parameter"**.

For the **"Name"** field, enter `/appointment-app/prod/db-password`.

For the **"Tier"** field, select **"Standard"**.

For the **"Type"** field, select **"SecureString"**.

For the **"KMS key source"** field, select **"My current account"**.

For the **"KMS Key ID"** dropdown, select **"alias/aws/ssm"**.

For the **"Value"** field, enter the password you used to create the RDS database.

Click **"Create parameter"**.

You will be redirected to the Parameter Store console where you will see the parameter you just created.

Click again on **"Create parameter"**.

For the **"Name"** field, enter `/appointment-app/prod/db-database`.

For the **"Tier"** field, select **"Standard"**.

For the **"Type"** field, select **"String"**.

For the **"Data type"** field, select **"text"**.

For the **"Value"** field, enter `pets`.

## STAGE 3B - Set up the RDS database

To complete this stage, you will need to have the RDS database in a `Available` state. If you have not done it yet, please follow the section `STAGE 2 - Create the RDS database` in the [README](../README.md) file.

Navigate to the EC2 console: https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState

Click `Instances` in the left menu.

Locate and select the `AWS-EC2-Docker` instance.

Right-click and select `Connect`.

Select `Session Manager` and click `Connect`.

In the terminal window, enter the following commands:
   - `sudo su - ec2-user`
   - `python3 db_init.py`

If the script runs successfully, you should see the following output:
   - `Connected to MySQL database`
   - `Database created successfully`
   - `Table created successfully`