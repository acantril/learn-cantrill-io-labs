# Rekognition-ECR Demo

In this part of the DEMO, you will be creating a few things:-

- An ECR repository to store the Docker image that will be used to deploy the application.

- A Docker image that will be used to deploy the application.

# STAGE 2 - Create the ECR repository and build the Docker image

Navigate to the ECR console: https://us-east-1.console.aws.amazon.com/ecr/home?region=us-east-1

Click the "Get started" button on the right-hand side.

Make sure to select "Private" and enter "skynet-repo" as the name of the repository.

Click the "Create repository" button.

Navigate to the list of ECR repositories and copy the URI of the repository that you just created.

Navigate to the EC2 console: https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState

Click `Instances` in the left menu.

Locate and select the `AWS-EC2-Docker` instance.

Right-click and select `Connect`.

Select `Session Manager` and click `Connect`.

In the terminal window, enter the following commands:
   - `sudo amazon-linux-extras install docker`
   - `sudo service docker start`
   - `sudo usermod -a -G docker ec2-user`
   - `sudo su - ec2-user`
   - `unzip app.zip`

Paste the commands that you previously copied from the ECR repository in order.

Next we are going to build and push the Docker image to the ECR repository. To do so, we need to use the URI of the repository that you copied in the previous step. Enter the following commands:
   - Build the Docker image: `docker build -t skynet .`
   - Tag the Docker image: `docker tag skynet:latest <ECR URI>:latest`
   - Login to the ECR repository: `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR URI>`
   - Push the Docker image to the ECR repository: `docker push <ECR URI>:latest`

Once the docker push command is completed, you should see an image in the ECR repository with the "latest" tag under the `Image tag` column . Click on it to see the details and copy the URI of the image for the next stage.
