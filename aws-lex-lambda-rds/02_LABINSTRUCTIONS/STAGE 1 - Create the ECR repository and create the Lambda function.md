# Lex-Lambda-RDS Demo

Before you begin, make sure you have completed the pre-requisites listed in the [README](../README.md) file.

In this part of the DEMO, you will be creating a few things:-

- An ECR repository to store the Docker image that will be used to deploy the application to App Runner

- A Lambda function that will be used as backend for the Lex bot

- A Lambda layer that will be used by the Lambda function

# STAGE 1 - Create the ECR repository and create the Lambda function

## STAGE 1A - Create the ECR repository

Navigate to the ECR console: https://us-east-1.console.aws.amazon.com/ecr/home?region=us-east-1

Click the "Get started" button on the right-hand side.

Make sure to select "Private" and enter **"animal-grooming-repo"** as the name of the repository.

Click the "Create repository" button.

We need the URI of the repository that we just created. It will have the following format:

`<AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com/animal-grooming-repo`

The `<AWS Account ID>` is the ID of your AWS account. You can find it in the upper-right corner of the AWS console.

## STAGE 1B - Create the Lambda Layer

Navigate to the Lambda Layer console: https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/layers

Click the "Create layer" button.

Enter **"animal-grooming-layer"** as the name of the layer.

Select **"Upload a file from Amazon S3"** as the source of the layer.

Enter the following URL in the **"Amazon S3 link URL"** field: https://learn-cantrill-labs.s3.amazonaws.com/aws-lex-lambda-rds/pymysql_layer.zip

Select **"x86_64"** as the compatible architectures.

Select **"Python 3.8"** as the compatible runtimes.

Click the "Create" button.

To continue with the next stage, you will need first to have the CloudFormation stack deployed. If you have not done it yet, please follow the section `1-Click Install` in the [README](../README.md) file.

## STAGE 1C - Create the Lambda function

Navigate to the Lambda function console: https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions

Click the "Create function" button.

Select **"Author from scratch"** as the blueprint.

Enter **"animal-grooming-function"** as the name of the function.

Select **"Python 3.8"** as the runtime.

Señect **"x86_64"** as the architecture.

In the permissions section, click change default execution role and then select **"Use an existing role"**. In the dropdown, select the one you got from the output named **"LambdaRoleName"** of the CloudFormation stack. It will have a name with the following format: `<Stack Name>-LambdaRoleName-<Random String>`.

Click the **"Create function"** button.

Next in the **"Code source"** section, click the **"Upload from"** button and select **"Amazon S3 location"**.

Enter the following URL in the **"Amazon S3 link URL"** field: https://learn-cantrill-labs.s3.amazonaws.com/aws-lex-lambda-rds/lambda_function.zip

Click the **"Save"** button.

Next we need to add the Lambda layer that we created in the previous step. Navigate to the **"Layers"** section at the bottom of the page and click the **"Add a layer"** button.

Click on the Custom layers option and in the **"Custom layers"** dropdown, select the layer that we created in the previous step (**animal-grooming-layer**). Select the unique version of the layer in the "**Version**" dropdown and click the **"Add"** button.