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
Load this link in a new tab (https://raw.githubusercontent.com/acantril/learn-cantrill-io-labs/master/00-aws-simple-demos/aws-lambda-s3-events/01_LABSETUP/policy/s3pixelator.json)  
Copy the entire contents into your clipboard and paste into the previous permissions policy code editor box  
Locate the words `REPLACEME` there should be `4` occurrences, 2 each for the source and processed buckets .. and for each of those one for the bucket and another for the objects in that bucket.  
Replace the term `REPLACEME` with the name you picked for your buckets above, in my example it is `donotusethisname`  
You should end with 4 lines looking like this, only with `YOUR` bucket names  

```
"Resource":[
	"arn:aws:s3:::donotusethisname-processed",
	"arn:aws:s3:::donotusethisname-processed/*",
	"arn:aws:s3:::donotusethisname-source/*",
	"arn:aws:s3:::donotusethisname-source"
]

```

Locate the two occurrences of `YOURACCOUNTID`, you need to replace both of these words with your AWS account ID  
To get that, click the account dropdown at the top right   
click the small icon to copy down the `Account ID` and replace the `YOURACCOUNTID` in the policy code editor. *important* if you use the 'icon' to copy this number, it will remove the `-` in the account number for you :) you need to paste `123456789000` rather than `1234-5678-9000`  

You should have something which looks like this, only with your account ID:  

```
{
	  "Effect": "Allow",
	  "Action": "logs:CreateLogGroup",
	  "Resource": "arn:aws:logs:us-east-1:123456789000:*"
  },
  {
	  "Effect": "Allow",
	  "Action": [
		  "logs:CreateLogStream",
		  "logs:PutLogEvents"
	  ],
	  "Resource": [
		  "arn:aws:logs:us-east-1:123456789000:log-group:/aws/lambda/pixelator:*"
	  ]
  }

```

Click `Review Policy`  
For name put `pixelator_access_inline`  and create the policy.  

# Stage 3 (pre) - ONLY DO THIS PART IF YOU WANT TO GET EXPERIENCE OF CREATING A LAMBDA ZIP

TO BE FINISHED

# Stage 3 - Create the Lambda Function

Move to the lambda console (https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions)  
Click `Create Function`  
We're going to be `Authoring from Scratch`  
For `Function name` enter `pixelator`  
for `Runtime` select `Python 3.9`  
For `Architecture` select `x86_64`  
For `Permissions` expand `Change default execution role` pick `Use an existing role` and in the `Existing role` dropdown, pick `PixelatorRole`  
Then `Create Function`  
Close down any `notifcation` dialogues/popups  
Click `Upload from` and select `.zip file`
Either 1, download this zip to your local machine (https://github.com/acantril/learn-cantrill-io-labs/blob/master/00-aws-simple-demos/aws-lambda-s3-events/01_LABSETUP/my-deployment-package.zip, click Download)  
or 2, locate the .zip you created yourself in the `Stage 3(pre)` above - they will be identical  
On the lambda screen, click `Upload` locate and select that .zip, and then click the `Save` button  
This upload will take a few minutes, but once complete you might see something saying `The deployment package of your Lambda function "pixelator" is too large to enable inline code editing. However, you can still invoke your function.` which is OK :)  



# Stage 4 - Configure the Lambda Function & Trigger

# Stage 5 - Test and Monitor

# Stage 6 - Cleanup




