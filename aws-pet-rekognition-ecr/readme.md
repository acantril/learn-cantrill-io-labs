# Rekognition-ECR Demo

In this demo you will be creating a Rekognition model that will be used to detect cats and dogs images. You will then build a simple Flask application using Docker that will be used to test the Rekognition model. This application will be uploaded to an ECR repository and deployed to an ECS cluster.

The demo is dividen in 5 stages:

- Stage 1 - Create and train the Rekognition model
- Stage 2 - Create the ECR repository and build the Docker image
- Stage 3 - Create the ECS cluster, ECS task definition and ECS service
- Stage 4 - Test the application
- Stage 5 - Clean up

## 1-Click Install
Make sure you are logged into AWS and in `us-east-1`
Apply the template below and wait for `CREATE_COMPLETE` before continuing

- [PETREKOGNITIONECR](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-pet-rekognition-ecr/APPCFN.yaml&stackName=PETREKOGNITIONECR)

## Pre-requisites

Deploy the CloudFormation stack using the link provided in the `1-Click Install` section.

## Instructions

- [Stage1](./02_LABINSTRUCTIONS/STAGE%201%20-%20Create%20and%20train%20the%20Rekognition%20model.md)
- [Stage2](./02_LABINSTRUCTIONS/STAGE%202%20-%20Create%20the%20ECR%20repository%20and%20build%20the%20Docker%20image.md)
- [Stage3](./02_LABINSTRUCTIONS/STAGE%203%20-%20Create%20the%20ECS%20cluster%2C%20ECS%20task%20definition%20and%20ECS%20service.md)
- [Stage4](./02_LABINSTRUCTIONS/STAGE%204%20-%20Test%20the%20application.md)
- [Stage5](./02_LABINSTRUCTIONS/STAGE%205%20-%20Clean%20up.md)