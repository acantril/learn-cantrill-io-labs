# Rekognition-ECR Demo

In this part of the DEMO, you will be creating a few things:-

- An ECS cluster to deploy the application.
- An ECS task definition to define the application.
- An ECS service to deploy the application.

# STAGE 3 - Create the ECS cluster, ECS task definition and ECS service

## STAGE 3A - Create the ECS cluster

Move to the ECS console: https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#

Select the new ECS experience in the left-hand menu to see the new ECS console.

In the left-hand menu, click on “Clusters” and then click on the “Create cluster” button.

Enter SkynetCluster as the name of the cluster.

In the networking section select the VPC with the name A4L-VPC and the only subnet that is available.

Click “Create” button.

## STAGE 3B - Create the ECS task definition

In the left-hand menu, click on “Task definitions”.

Click “Create new task definition” button.

Enter “SkynetTaskDefinition” as the name of the task definition.

In the container details section enter the following details:

 - Container name: skynet
 - Image URI: The one you got in the previous stage

In the environment variables section add the following ones:
 - Key: BUCKET_NAME
 - Value: The output "S3BucketName" from the Cloudformation stack you deployed

 - Key: MODEL_ARN
 - Value: The one you got in the first stage

Click “Next” button.

In the Task size section change the CPU and Memory values to the following ones:
 - CPU: .5 vCPU
 - Memory: 1 GB

In the Task role and the task execution role section select the output "ECSRoleName" from the Cloudformation stack you deployed.

In the Monitoring and logging section uncheck “Use log collection”.

Click “Next” button and then click “Create” button.

## STAGE 3C - Create the ECS service

In the left-hand menu, click on “Task definitions”.

Select the “SkynetTaskDefinition” task definition, click “Deploy” button  and then click “Create service”.

In the existing cluster section select “SkynetCluster”.

In the computer options section select Launch type and make sure the “FARGATE” launch type is selected.

In the deployment configuration section enter “SkynetService” as the service name.

In the networking section enter the following details:
 - VPC: A4L-AWS
 - Subnets: The only subnet that is available
 - Security group: The output "SecurityGroup" from the Cloudformation stack you deployed
 - Public IP: Turned on

Click “Create” button.
