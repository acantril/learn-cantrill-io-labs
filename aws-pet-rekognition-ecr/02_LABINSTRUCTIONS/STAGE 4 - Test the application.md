# Rekognition-ECR Demo

In this part of the DEMO, you will be testing the application.

# STAGE 4 - Test the application

After 3-5 minutes, you should see the service “SkynetService” with the status “Active”.

Click the “Tasks” tab and then click the task available to see the details. Get the Public IP of the task and paste in a new tab. You should get access to a simple web page where you can upload files of cats and dog to validate the model we trained in a previous stage. Bear in mind the following:
 * You need to upload a file with a cat or a dog but not a picture that contains both. If you upload a picture with both, the model will not be able to predict the correct class. The result of the prediction will be displayed in the web page with a single result (cat or dog).
 * The maximum size of the file is 15MB.
 * The file must be in JPG or PNG format.
 * The maximum for both width and height is 4096 pixels.
