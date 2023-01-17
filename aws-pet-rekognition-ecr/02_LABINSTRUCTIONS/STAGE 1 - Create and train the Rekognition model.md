# Rekognition-ECR Demo

In this part of the DEMO, you will be doing the following:-

- Creating a Rekognition model that will be used to detect cats and dogs in images.
- Training the model with a set of images that contain cats and dogs.

# STAGE 1 - Create and train the Rekognition model

Navigate to the Rekognition console: https://us-east-1.console.aws.amazon.com/rekognition/home?region=us-east-1#/

In the left-hand menu, click on "Use Custom Labels".

Click on the "Get started" button.

A pop-up window will appear if you **have not created** a Rekognition Custom Labels project before. This pop-up windows will ask you to create an S3 bucket to store all the data related to the model that you will be training. Save the name of the bucket that will be created, it will have the following format: `custom-labels-console-us-east-1-<random string>`. You will need it in the cleanup stage. Click on the "Create S3 bucket" button to create the S3 bucket.

In the left-hand menu, click on "Projects" and create a project with the name "skynet-cats-and-dogs".
Click on the "Create dataset" button and select the following options:
 - Configuration options: Start with a single dataset
 - Training dataset details: Upload images from your computer
 - Click Create Dataset

In the following screen, you will be able to upload the images that will be used to train the model. These images are available in the cat_dogs_training_data.zip file.

Unzip the file. You will see four folders: `training_data_1`, `training_data_2`, `training_data_3` and `training_data_4`.

Click on the top-right "Actions" button and then click on "Add images to training dataset" to start uploading the images. Currently, the AWS console allows you to upload 30 images at a time, so you will need to do it in four attempts. To do so, upload in four different attempts all the images from the `training_data_1`, `training_data_2`, `training_data_3` and `training_data_4` folders.

Once you have uploaded all the images, you should see a total of 100 unlabeled images in the left-hand panel.

Click on the top-right "Start labeling" button and then click on the "Add labels" button located on the left-hand panel.

A pop-up window will appear to create your labels. Click on "Add labels" and add the "cat" and "dog" labels. Click "Save".

To label the cat and dog images, select the images and click on "Assign image-level labels" to assign the "cat" or "dog" label to them. Once all the images are labeled, click on "Save changes" and then click on "Finish Labeling". You should now see 100 labeled images (50 dogs and 50 cats).

If so, you are ready to start training the model. Click on the top-right "Train model" button. In the next screen, click on the "Train model" button and then click again on the "Train model" button that appears in the pop-up window.

The training process can take approximately 40-60 minutes to complete, so you can start the stages 2 and 3A while the model is being trained.

To check the progress of the training, take a look at the "Model status" column. It will change the status to TRAINING_COMPLETED once the training is complete.

Once the training is complete, we need to **start the model**. To do so, click in the model name to see the details of the model. Click on the "Use the model" tab and then click on the **"Start" button**. Click again on the "Start" button that appears in the pop-up window.

Lastly, copy and save the **ARN** of the model that you will find in the same screen. You will need it in a later stage.
