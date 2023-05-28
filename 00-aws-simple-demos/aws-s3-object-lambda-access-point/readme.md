# S3 Object Lambda Access Point

# Overview

We’re going to create an S3 Object Lambda Access Point that when used, will blur out the faces of any people in the images we view via the access point.

We will be creating this environment in the ap-southeast-2 (Sydney) region, so all links to the console will be there. Make sure you change region if you’re deploying elsewhere.

Note: Our Lambda function will use AWS Rekognition, which is only available in certain regions, you will need to use one of these regions: [https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/)

AWS Rekognition has a fairly generous free tier, but even if your account is out of the free tier period, each face detection is only $0.001, and there is no clean up required after this demo.

# Instructions

## Stage 1 - Creating the IAM policy and role

Head to the IAM console: [https://us-east-1.console.aws.amazon.com/iamv2/home](https://us-east-1.console.aws.amazon.com/iamv2/home)

Go to Policies and click <kbd>Create policy</kbd>

![Untitled](images/Untitled.png)

Go to the JSON tab, and enter the following:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:*:*:log-group:/aws/lambda/*:*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "rekognition:DetectFaces",
                "s3-object-lambda:WriteGetObjectResponse"
            ],
            "Resource": "*"
        }
    ]
}
```

![Untitled](images/Untitled%201.png)

This policy will allow our Lambda to create a log group, put logs into that log group, use the “DetectFaces” API from AWS Rekognition, and lastly (and most importantly) to return a response via the S3 Object Lambda “WriteGetObjectResponse” call.

Click <kbd>Tags</kbd>

Click <kbd>Review</kbd>

Set the Name to `s3-lambda-blur-faces`

Click <kbd>Create policy</kbd>

Go to Roles and click on <kbd>Create role</kbd>

![Untitled](images/Untitled%202.png)

On the trusted entity page, leave “AWS service” selected and choose “Lambda”

![Untitled](images/Untitled%203.png)

Under “Permissions”, search for and select `s3-lambda-blur-faces`

![Untitled](images/Untitled%204.png)

Click <kbd>Next</kbd>

Set the Role name to `s3-lambda-blur-faces`

Click <kbd>Create role</kbd>

## Stage 2 - Creating the Lambda function

Head to the Lambda console: [https://ap-southeast-2.console.aws.amazon.com/lambda/home?region=ap-southeast-2#/functions](https://ap-southeast-2.console.aws.amazon.com/lambda/home?region=ap-southeast-2#/functions)

Go to Functions and click <kbd>Create function</kbd>

![Untitled](images/Untitled%205.png)

Set the Function name to `make-face-blurry`

Change the Runtime to Python 3.9

Expand the Permissions pane and select “Use an existing role”. Search for the `s3-lambda-blur-faces` role we created in the last stage

![Untitled](images/Untitled%206.png)

Click <kbd>Create function</kbd>

The function code we will be using is the following (you don’t need to copy and paste it anywhere, this is just for your own knowledge).

```python
import boto3
from PIL import Image, ImageFilter
import requests
import io

s3 = boto3.client('s3')
rekognition = boto3.client('rekognition')

def lambda_handler(event, context):
    get_context = event["getObjectContext"]
    route = get_context["outputRoute"]
    token = get_context["outputToken"]
    s3_url = get_context["inputS3Url"]

    # Download the original image from S3
    image_request = requests.get(s3_url)
    image = Image.open(io.BytesIO(image_request.content))

    # Detect faces in the image using Amazon Rekognition
    response = rekognition.detect_faces(Image={'Bytes': image_request.content})
    faces = response['FaceDetails']
    
    # Blur out the faces in the image
    for face in faces:
        box = face['BoundingBox']
        x1 = int(box['Left'] * image.width)
        y1 = int(box['Top'] * image.height)
        x2 = int((box['Left'] + box['Width']) * image.width)
        y2 = int((box['Top'] + box['Height']) * image.height)
        face_image = image.crop((x1, y1, x2, y2))
        blurred_face = face_image.filter(ImageFilter.BoxBlur(radius=10))
        image.paste(blurred_face, (x1, y1, x2, y2))

    
    # Save the resulting image to memory
    output = io.BytesIO()
    image.save(output, format=image.format)
    output_content = output.getvalue()

    # Save the image and return the object response
    s3 = boto3.client('s3')
    s3.write_get_object_response(Body=output_content, RequestRoute=route, RequestToken=token)

    return {
        'statusCode': 200
    }
```

In this demo folder in Github, you will see a `function.zip` file, you will need to download that file, and then in the Lambda window, click <kbd>Upload from</kbd> and then <kbd>.zip file</kbd>

![Untitled](images/Untitled%207.png)

Click <kbd>Upload</kbd> and then select the `function.zip` file

![Untitled](images/Untitled%208.png)

Click <kbd>Save</kbd>

The reason you can’t just copy and paste the code above, is because the function relies on some Python libraries that are not available to a Lambda function by default, so this zip file contains the function code, as well as the libraries it needs. Information on how to do this can be found here: [https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-create-package-with-dependency](https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-create-package-with-dependency)

Head to the Configuration tab, then General configuration and click <kbd>Edit</kbd>

![Untitled](images/Untitled%209.png)

Change the Timeout to be 0 min 30 sec

![Untitled](images/Untitled%2010.png)

Click <kbd>Save</kbd>

The reason we are changing this is because 3 seconds is quite short for a function that is doing image manipulation. If you read the code above, the Lambda retrieves the file from S3, sends the image to AWS Rekognition, gets the response back with a list of faces and where they are in the image, then it needs to go to each of these places in the image and “paste” a blur box over it. It then needs to return the object to S3. So 3 seconds usually won’t be enough. 

## Stage 3 - Creating the S3 buckets and access points

Head to the S3 console: [https://s3.console.aws.amazon.com/s3/buckets?region=ap-southeast-2](https://s3.console.aws.amazon.com/s3/buckets?region=ap-southeast-2)

Go to Buckets and click <kbd>Create bucket</kbd>

![Untitled](images/Untitled%2011.png)

Set the bucket name to anything you like (remember bucket names are regionally unique), for this demo I will use `demo-employee-photos`

Make sure you select the region that your Lambda is deployed in. In my case, `ap-southeast-2`

![Untitled](images/Untitled%2012.png)

Click <kbd>Create bucket</kbd>

Go to Access Points and click <kbd>Create access point</kbd>

![Untitled](images/Untitled%2013.png)

Set the Access point name to anything you like, I will use `demo-employee-photos-ap`

Under Bucket name click <kbd>Browse S3</kbd>

![Untitled](images/Untitled%2014.png)

Select the bucket we just created, and click <kbd>Choose path</kbd>

![Untitled](images/Untitled%2015.png)

Under Network origin select “Internet”

![Untitled](images/Untitled%2016.png)

Leave all other options as is, and click <kbd>Create access point</kbd>

Go to Object Lambda Access Points and click <kbd>Create Object Lambda Access Point</kbd>

![Untitled](images/Untitled%2017.png)

Set the Object Lambda Access Point Name to anything you like, I will use `demo-employee-photos-oap` 

Again, make sure the region selected is the region where your Lambda is. For me this is `ap-southeast-2`

Under Supporting Access Point settings, click <kbd>Browse S3</kbd>

![Untitled](images/Untitled%2018.png)

Select the access point you created in the previous step, and click <kbd>Choose supporting Access Point</kbd>

![Untitled](images/Untitled%2019.png)

Under Transformation configuration, select “GetObject”

![Untitled](images/Untitled%2020.png)

Under Lambda function select the function we created in the previous step

![Untitled](images/Untitled%2021.png)

Leave all other settings default, and click <kbd>Create Object Lambda Access Point</kbd>

In a production environment you would want to apply some policies to either the Object Lambda Access Point, or the Access Point, but for this demo we will leave those as is.

## Stage 4 - Testing our access point

Head to the S3 console: [https://s3.console.aws.amazon.com/s3/buckets?region=ap-southeast-2](https://s3.console.aws.amazon.com/s3/buckets?region=ap-southeast-2)

Go to Buckets and open the bucket we created earlier

![Untitled](images/Untitled%2022.png)

You will need some photos of people, whether they’re photos of yourself, or just images off the internet. A website I have been using for this demo is: [https://www.freepik.com/photos/people](https://www.freepik.com/photos/people)

In the bucket, click <kbd>Upload</kbd>

Click <kbd>Add files</kbd>

![Untitled](images/Untitled%2023.png)

Note: Make sure you only upload JPEG or PNGs, our very basic Lambda function will return errors if a file is retrieved that is not an image.

Once you’ve selected your files, click <kbd>Upload</kbd>

![Untitled](images/Untitled%2024.png)

Our demo bucket now has photos of people in it, if we open one of these images directly from the bucket itself, we will see the original image:

![Untitled](images/Untitled%2025.png)

![Untitled](images/Untitled%2026.png)

Now if we head back to S3, and go to Object Lambda Access Points and go into our Access Point

![Untitled](images/Untitled%2027.png)

We can see those same files, but this time, if we Open them, we’re retrieving them via the Object Lambda Access Point, and the file will therefore be modified by the Lambda.

Select any of the images, and click <kbd>Open</kbd>

![Untitled](images/Untitled%2028.png)

You should see the image, this time any / all faces will be blurred (assuming the image has people’s faces in it).

![Untitled](images/Untitled%2029.png)

## Stage 5 - Optional: Testing our access point via CLI

Firstly, make sure you have the AWS CLI installed on your PC by following these instructions: [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

You will then need an Access Key, and Secret Key, for your AWS IAM User. Click on the account details button in the top right of the console and then click <kbd>Security credentials</kbd>

![Untitled](images/Untitled%2030.png)

This will take you to the IAM page for your AWS user. Scroll down to Access Keys and click <kbd>Create access key</kbd>

![Untitled](images/Untitled%2031.png)

On the next page, click “Other” and then <kbd>Next</kbd>

![Untitled](images/Untitled%2032.png)

Set the description to “S3 Object Lambda Demo” and click <kbd>Create access key</kbd>

With your command line open, run `aws configure` and enter the Access Key 

![Untitled](images/Untitled%2033.png)

Then your Secret Key

![Untitled](images/Untitled%2034.png)

Then your default region, set this to the region you created your Lambda and S3 Access Points in (`ap-southeast-2` for me)

![Untitled](images/Untitled%2035.png)

Leave the default output format as is

Once that’s done, your CLI now has all of the permissions your user in the AWS console has.

First we’ll try downloading one of the images via the regular S3 Access Point. Head to the S3 console, go to Access Points and then into the access point you created

![Untitled](images/Untitled%2036.png)

Click on any of the images

![Untitled](images/Untitled%2037.png)

On the Properties tab, copy the S3 URI

![Untitled](images/Untitled%2038.png)

In your CLI, enter the following command to retrieve that S3 object (replacing `<COPIED S3 URI HERE>` with the text you copied from the console)

```json
aws s3 cp <COPIED S3 URI HERE> .
```

This tells S3 to “copy” the object from S3, to your local PC

You should see in the directory you’re in, in your CLI, the image you just downloaded from S3 without blurred faces

![Untitled](images/Untitled%2039.png)

Now let’s do the same thing via the Object Lambda Access Point. Head to the S3 console and go to Object Lambda Access Points, then click your access point

![Untitled](images/Untitled%2040.png)

Go to the Properties tab, and copy the Object Lambda Access Point Alias

![Untitled](images/Untitled%2041.png)

Now back in your CLI, enter the following command. Note the alias we just copied does not include the object file name, so in my case I’m going to download “people-6.jpg”, so I need to add that to the end of the source. You should replace `demo-employee-photos-rqkaja3g7fdqkue5itnpd4baaps2a--ol-s3` with the text you copied. Make sure you put `s3://` in front of it

```json
aws s3 cp s3://demo-employee-photos-rqkaja3g7fdqkue5itnpd4baaps2a--ol-s3/people-6.jpg .
```

You should have the new file downloaded (replacing the old file, unless you selected a different file in S3), this time with the faces blurred

![Untitled](images/Untitled%2042.png)

## Stage 6 - Clean up

Head to the S3 console: [https://s3.console.aws.amazon.com/s3/buckets](https://s3.console.aws.amazon.com/s3/buckets?region=ap-southeast-2&region=ap-southeast-2)

Go to Object Lambda Access Points, select your access point and click <kbd>Delete</kbd>

![Untitled](images/Untitled%2043.png)

Enter the access point name in the confirmation window, and click <kbd>Delete</kbd>

Go to Access Points, select your access point and click <kbd>Delete</kbd>

![Untitled](images/Untitled%2044.png)

Enter the access point name in the confirmation window, and click <kbd>Delete</kbd>

Go to Buckets

Select the bucket you created earlier, and click <kbd>Empty</kbd>

![Untitled](images/Untitled%2045.png)

Enter “*permanently delete”* in the confirmation window, and click <kbd>Empty</kbd>

Then, select the bucket again, and click <kbd>Delete</kbd>

![Untitled](images/Untitled%2046.png)

Enter the bucket name in the confirmation window, and click <kbd>Delete</kbd>

Head to the Lambda console: [https://ap-southeast-2.console.aws.amazon.com/lambda](https://ap-southeast-2.console.aws.amazon.com/lambda)

Go to Functions, select the `make-face-blurry` function, click <kbd>Actions</kbd> then click <kbd>Delete</kbd>

![Untitled](images/Untitled%2047.png)

Type “delete” in the confirmation box and click <kbd>Delete</kbd>

Head to the CloudWatch console: [https://ap-southeast-2.console.aws.amazon.com/cloudwatch](https://ap-southeast-2.console.aws.amazon.com/cloudwatch)

Go to Log Groups, select the log group for your Lambda (it should be named `/aws/lambda/make-face-blurry`) then click <kbd>Actions</kbd> then <kbd>Delete log group(s)</kbd>

![Untitled](images/Untitled%2048.png)

Click <kbd>Delete</kbd> in the confirmation box

Head to the IAM console: [https://us-east-1.console.aws.amazon.com/iamv2/home#/roles](https://us-east-1.console.aws.amazon.com/iamv2/home#/roles)

Go to Roles and select the role we created in stage 1, `s3-lambda-blur-faces` and click <kbd>Delete</kbd>

![Untitled](images/Untitled%2049.png)

Enter the role name in the confirmation box and click <kbd>Delete</kbd>

Go to Policies, select the policy we created earlier (`s3-lambda-blur-faces`) and click <kbd>Actions</kbd> then <kbd>Delete</kbd>

![Untitled](images/Untitled%2050.png)

Enter the policy name in the confirmation box and click <kbd>Delete</kbd>

If you completed stage 5 and would like to remove your IAM User’s access key, go back into your Security Credentials page

![Untitled](images/Untitled%2030.png)

Scroll down to Access keys, and next to the access key you created (make sure the description is “S3 Object Lambda Demo”) and click <kbd>Actions</kbd> then <kbd>Delete</kbd>

![Untitled](images/Untitled%2051.png)

Click <kbd>Deactivate</kbd>

![Untitled](images/Untitled%2052.png)

Then enter your access key, and click <kbd>Delete</kbd>

![Untitled](images/Untitled%2053.png)