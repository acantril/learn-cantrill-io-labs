# Lex-Lambda-RDS Demo

In this demo you will be creating a Lex bot that will be used to make an appointment for your pet to take it to the grooming salon. You will also build a simple Lambda function that will be used as backend for the Lex bot. This function will also be used to insert the appointment information into a RDS database. Lastly, you will deploy a simple web application using App Runner service that will be used to review and cancel the appointments.

The demo is dividen in 6 stages:

- Stage 1 - Create the ECR repository and create the Lambda function
- Stage 2 - Create the RDS database
- Stage 3 - Build the Docker image, create Parameter Store entries and set up RDS database
- Stage 4 - Create and configure the Lex bot
- Stage 5 - Deploy the application using App Runner
- Stage 6 - Test the bot and review the appointments
- Stage 7 - Clean up

## 1-Click Install
Make sure you are logged into AWS and in `us-east-1`
Apply the template below and wait for `CREATE_COMPLETE` before continuing

- [PETLEXLAMBDARDS](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-lex-lambda-rds/APPCFN.yaml&stackName=PETLEXLAMBDARDS)

## Pre-requisites

Deploy the CloudFormation stack using the link provided in the `1-Click Install` section.

## Instructions

- [Stage1](./02_LABINSTRUCTIONS/STAGE%201%20-%20Create%20the%20ECR%20repository%20and%20create%20the%20Lambda%20function.md)

- [Stage2](./02_LABINSTRUCTIONS/STAGE%202%20-%20Create%20the%20RDS%20database.md)

- [Stage3](./02_LABINSTRUCTIONS/STAGE%203%20-%20Build%20the%20Docker%20image%2C%20create%20Parameter%20Store%20entries%20and%20set%20up%20RDS%20database.md)

- [Stage4](./02_LABINSTRUCTIONS/STAGE%204%20-%20Create%20and%20configure%20the%20Lex%20bot.md)

- [Stage5](./02_LABINSTRUCTIONS/STAGE%205%20-%20Deploy%20the%20application%20using%20App%20Runner.md)

- [Stage6](./02_LABINSTRUCTIONS/STAGE%206%20-%20Test%20the%20bot%20and%20review%20the%20appointments.md)

- [Stage7](./02_LABINSTRUCTIONS/STAGE%207%20-%20Clean%20up.md)