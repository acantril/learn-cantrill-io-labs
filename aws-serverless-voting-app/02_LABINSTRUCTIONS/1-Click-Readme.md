
# 1-Click Install For Serverless Voting Application 

## Step 1 - Cloudformation Template

Login into AWS and select the `us-east-1` region. Apply the template below and wait for `CREATE_COMPLETE` before continuing with step-2.
### [Serverless Voting Application](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-serverless-voting-app/aws-serverless-voting-app.yaml&stackName=Serverless-Voting-App-Demo)

This template will create the below resources.
- Lambda Functions
- IAM Policies, Lambda Execution roles
- DynamoDB
- API Gateway
- S3 Bucket
- Cloud9 IDE

## Step 2 - Update the API Gateway endpoints in the React application and deploy to S3 bucket for website hosting

### Check S3 bucket name and website URL

In the **Outputs** section of the cloudformation stack, note that the S3 bucket name and the S3 website URL is displayed. Make a note of these two as they are required in the following steps.

![Screenshots](./Screenshots/1click/cfoutputs.png)

### Get API Gateway Endpoints

- Open the API Gateway console and click on the `Voting-App-Api-Gateway` 
- Under `results` click on `GET` and then `Integration Request`

![Screenshots](./Screenshots/1click/apigateway/b1.png)

- Click on the edit icon for `voting-app-fetch-results` and then click on the tick icon.

![Screenshots](./Screenshots/1click/apigateway/b2.png)
![Screenshots](./Screenshots/1click/apigateway/b3.png)

- Click **Ok** to proceed.

![Screenshots](./Screenshots/1click/apigateway/b4.png)

- Click on **Actions** and then on **Deploy API**

![Screenshots](./Screenshots/1click/apigateway/18.png)

- Create a new deployment stage and enter a stage name `dev` and click on **Deploy**

![Screenshots](./Screenshots/1click/apigateway/19.png)

![Screenshots](./Screenshots/1click/apigateway/20.png)

- The stages section will be opened.

![Screenshots](./Screenshots/1click/apigateway/21.png)

- Click on the stage name `dev` under which you can see both `vote` and `results` resources.
- Click on each resource to view the api gateway endpoint for that resource.
- Note that these two URL's will be used in the React frontend to call the api gateway and the backend lambda functions.

![Screenshots](./Screenshots/1click/apigateway/22.png)

![Screenshots](./Screenshots/1click/apigateway/23.png)

### Editing the React application using Cloud9 IDE and copy static content to S3 Bucket

- Open the Cloud9 IDE and **Open** the `VotingAppCloud9IDE` environment.

![Screenshots](./Screenshots/1click/cloud9/15.png)

![Screenshots](./Screenshots/1click/cloud9/16.png)

- Wait for few minutes for the IDE to open and you will see a terminal where you can run linux commands.

![Screenshots](./Screenshots/1click/cloud9/22.png)

- Run the below commands in the terminal

```
sudo yum install -y nodejs
node -v
wget https://learn-cantrill-labs.s3.amazonaws.com/aws-serverless-voting-app/voting-app-frontend.zip
unzip voting-app-frontend.zip
cd voting-app-frontend
```

- As shown in the below screenshot, expand the folder `voting-app-frontend` from the left side file explorer of the IDE.
- Inside src, there is a `Vote.js` file. Open the file.
- You will see that, there are two urls configured in the code `vote_url` for `vote` and `results_fetchurl` for `fetch results`
- Replace these two URL's with the two urls that you received after creating the API Gateway deployment.

![Screenshots](./Screenshots/1click/cloud9/24.png)

- Save the file with CTRL+S
- In the terminal, run the below commands

```
npm update
npm run build
```

![Screenshots](./Screenshots/1click/cloud9/25.png)

![Screenshots](./Screenshots/1click/cloud9/26.png)

![Screenshots](./Screenshots/1click/cloud9/27.png)

- Now you can run the below commands to copy the contents of the build folder to the s3 bucket. Replace the bucket name with the bucketname that was present in the cloudformation stack output.

```
cd build
aws s3 cp . 's3://<REPLACE_BUCKET_NAME_FROM_STACK_OUTPUT>' --recursive
```

![Screenshots](./Screenshots/1click/cloud9/28.png)

- In the S3 bucket refresh to see the newly copied files.

![Screenshots](./Screenshots/1click/cloud9/29.png)

- Try to access the webpage with the **Bucket website endpoint** that was present in the cloudformation stack output.

![Screenshots](./Screenshots/1click/cloud9/30.png)

### Creating a Cloudfront distribution for this application (Optional)

- Deploy this [Template](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-serverless-voting-app/cloudfront.yaml&stackName=CDN-Serverless-Voting-App-Demo) to create a Cloudfront distribution.

- In the **Parameters** section, for S3BucketURL enter the **Bucket website endpoint** without the `http://` and proceed and deploy the Stack.

![Screenshots](./Screenshots/1click/cloudfront.png)

- In the **Outputs** section of cloudformation stack, you will get the Cloudfront endpoint. Open it in a new tab to see the webpage.

![Screenshots](./Screenshots/1click/cloudfront2.png)


