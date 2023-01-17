# Rekognition-ECR Demo

In this part of the DEMO, you will be cleaning up the resources you created.

# STAGE 5 - Clean up

Move to the ECS console: https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#.

Click on “Clusters” and then click on the “SkynetCluster” cluster.

Select the SkynetService and click “Delete service” button. Check “Force delete service”, type delete and click “Delete” button.

Click on “Task definitions” and then click on the “SkynetTaskDefinition” task definition.

Select the active task definition and click “Deregister” button. A pop-up window will appear, click “Deregister” button.

Click on “Clusters” and then click on the “SkynetCluster” cluster.

Click “Delete cluster” button.

Type delete SkynetCluster and click "Delete" button.

Move to the ECR console: https://us-east-1.console.aws.amazon.com/ecr/home?region=us-east-1

Select the skynet-repo and click “Delete” button.

Type delete and click “Delete” button.

Go to the Rekognition console: https://us-east-1.console.aws.amazon.com/rekognition/home?region=us-east-1#/

In the left-hand menu select projects.

We will see the project we created in the first stage. We need to stop the project and then delete the project and the versions. For this do:

Click on the model to see the details. Click on the "Use the model" tab and then click on the "Stop" button.

Go back to the projects by clicking in the left-hand menu on "Projects".

Select the “skynet-cat-and-dogs” and click “Delete” button.

Type delete and click “Delete” button.

Go to the S3 console: https://s3.console.aws.amazon.com/s3/home?region=us-east-1&region=us-east-1

We need to empty the bucket created for the Rekognition model and then delete the bucket. The name of the bucket is the one you got in the first stage with the format `custom-labels-console-us-east-1-<random string>`.

For this bucket do:

Select the bucket.

Click Empty.

Type permanently delete, and empty.

Click "Delete" button.

Type the name of the bucket and click "Delete bucket" button.

We also need to empty the bucket created by the Cloudformation stack so it can be deleted by the stack in the next step. The name of the bucket is the one you got from the **output "S3BucketName"** from the Cloudformation stack you deployed.

For this bucket do:

Select the bucket.

Click Empty.

Type permanently delete, and empty.

Go to the Cloudformation console: https://console.aws.amazon.com/cloudformation/home?region=us-east-1

Delete the stack created.
