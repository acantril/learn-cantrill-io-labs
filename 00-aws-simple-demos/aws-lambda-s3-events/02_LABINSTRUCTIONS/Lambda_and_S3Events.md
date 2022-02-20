# Lambda and S3Events DEMO

In this demo lesson you're going to create a simple event-driven image processing pipeline. The pipeline uses two S3 buckets, a source bucket and a processed bucket. When images are added to the source bucket a lambda function is triggered based on the PUT.  When invoked the lambda function receives the `event` and extracts the bucket and object information. Once those details are known, the lambda function, using the `PIL` module pixelates the image with `5` different variations (8x8, 16x16, 32x32, 48x48 and 64x64) and uploads them to the processed bucket.

# Stage 1 - Create the S3 Buckets

Move to the S3 Console https://s3.console.aws.amazon.com/s3/home?region=us-east-1#  
We will be creating `2` buckets, both with the same name, but each suffixed with a functional title (see below) , all settings apart from region and bucket name can be left as default.  
Click `Create Bucket` and create a bucket in the format of unique-name-`source` in the `us-east-1` region  
Click `Create Bucket` and create a another bucket in the format of unique-name-`processed` also in the `us-east-1` region  
These names will need to be unique, but as an example  

Bucket 1 : `dontusethisname-source`  
Bucket 2 : `dontusethisname-processed`  

# Stage 2 - Create the Lambda Role

Move to the IAM Console https://console.aws.amazon.com/iamv2/home?#/home  
Click Roles, then Create Role  
For `Trusted entity type`, pick `AWS service`  
For the service to trust pick `Lambda`  then click `Next` , `Next` again  
For `Role name` put `PixelatorRole`  then Create the role  

Click `PixelatorRole`  
Under `Permissions Policy` we need to add permissions and it will be an `inline policy`  
Click `JSON`  and delete the contents of the code box entirely.  




# Stage 3 - Create the Lambda Function

# Stage 4 - Configure the Lambda Function & Trigger

# Stage 5 - Test and Monitor

# Stage 6 - Cleanup




