# Rekognition-ECR Demo

To complete this stage, you will need first to have the Cloudfomation stack deployed. If you have not done so, please follow the section `1-Click Install` in the main README.md file.

In this part of the DEMO, you will be creating a few things:-

- An ECR repository to store the Docker image that will be used to deploy the application.

- A Docker image that will be used to deploy the application.

# STAGE 2 - Create the ECR repository and build the Docker image

Navigate to the ECR console: https://us-east-1.console.aws.amazon.com/ecr/home?region=us-east-1

Click the "Get started" button on the right-hand side.

Make sure to select "Private" and enter **"skynet-repo"** as the name of the repository.

Click the "Create repository" button.

We need the URI of the repository that we just created. It will have the following format:

`<AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com/skynet-repo`

The `<AWS Account ID>` is the ID of your AWS account. You can find it in the upper-right corner of the AWS console.

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
   - Build the Docker image: `docker build -t skynet .`
   - Tag the Docker image: `docker tag skynet:latest <AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com/skynet-repo:latest`
   - Login to the ECR repository: `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com`
   - Push the Docker image to the ECR repository: `docker push <AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com/skynet-repo:latest`

Once the docker push command is completed, navigate to the ECR console: https://us-east-1.console.aws.amazon.com/ecr/home?region=us-east-1

Click on the repository that you created in the previous step.

You should see an image in the ECR repository with the "latest" tag under the **`Image tag` column**. Click on it to see the details and copy the URI of the image for the next stage. You should have something similar to this:

`<AWS Account ID>.dkr.ecr.us-east-1.amazonaws.com/skynet-repo:latest`
