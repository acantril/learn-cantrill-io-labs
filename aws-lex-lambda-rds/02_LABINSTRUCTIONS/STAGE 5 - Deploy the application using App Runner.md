# Lex-Lambda-RDS Demo

To complete this stage, you will need to have the CloudFormation stack deployed. If you have not done it yet, please follow the section `1-Click Install` in the [README](../README.md) file.

In this part of the DEMO, you will be doing the following:

- Deploy the web application using App Runner to review the appoinments

# STAGE 5 - Deploy the application using App Runner

Navigate to the App Runner console: https://us-east-1.console.aws.amazon.com/apprunner/home?region=us-east-1#/welcome

Click on **"Create an App Runner service"**.

In the **"Source"** section select the following:

  - **"Container registry"** as repository type.
  - **"Amazon ECR"** as provider.

For the **"Container image URI"** click on the **"Browse"** button.

A pop-up window will appear. Select the **"animal-grooming-repo"** as image repository and **"latest"** as image tag. Click on **"Continue"** button.

In the **"Deployment settings"** section select the following:

  - **"Manual"** as deployment trigger.

For the ECR access role, click on the **"Use existing service role"** button and select the role that was you got from the CloudFormation stack outputs. The output name is `AppRunnerBuildRoleName` and it will have the following format: `<Stack Name>-AppRunnerBuildRole-<Random String>`. Click on the **"Next"** button.

In the **"Service settings"** section select the following:

  - **"Service name"**: `animal-grooming`
  - **"Virtual CPU & memory"**: `1 vCPU, 2 GB memory`
  - **"Port"**: `80`

In the **"Security"** section select the following:

  - **"Instance role"**: The one that was you got from the CloudFormation stack outputs. The output name is `AppRunnerTaskRoleName` and it will have the following format: `<Stack Name>-AppRunnerTaskRole-<Random String>`.

In the **"Networking"** section select the following:

 - **"Incoming network traffic"**: `Public endpoint`
 - **"Outgoing network traffic"**: `Public access`

Click on the **"Next"** button and then click on the **"Create & deploy"** button at the bottom of the page.

It will take around 5 minutes for the service to be created and deployed. Once it is done, you will see a green pop-up message at the top of the page saying that the service was deployed successfully. Move to the **"Service overview"** section and click on the **"Default domain"** link. This will open a new tab with the web application.