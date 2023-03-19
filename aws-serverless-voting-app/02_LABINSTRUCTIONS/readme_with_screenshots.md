# Serverless Voting Application

In this mini project you will create a completely serverless voting application in two stages. First you will create the backend using API Gateway, Lambda functions and DynamoDB table. Then you will create the frontend application using ReactJS and deploy it to an S3 bucket for static website hosting which will be delivered using CloudFront CDN. Below is the architecture for this project.

![Architecture](Architecture-ServerlessVotingApp.png)

# Stage 1 - Backend

Choose a region where you want to deploy the application and use the same region for creating all the resources in below stages.

## Step 1 - Create a DynamoDB table

- Move to the DynamoDB console to create a new table.
- For **Table Name** enter `Voting_Table`
- For **Partition key** enter `vote_id` of type string
- Leave all the other options as default and click on **Create Table**

![Screenshots1](./Screenshots/Stage_1/Step_1/1.png)

- After the DynamoDB table is created you will get a success message.

![Screenshots2](./Screenshots/Stage_1/Step_1/2.png)

## Step 2 - Create Lambda Functions

### **Part-1: Create a Lambda function to get the users vote from frontend and store it in DynamoDB table.**

- Move to the Lambda console and click on **Create Function** 

![Screenshots1](./Screenshots/Stage_1/Step_2/Part_1/1.png)

- For **Function Name** enter `voting-app-store-vote`
- For **Runtime** select `Python 3.9`
- Leave all the other options as default and click on **Create Function**

![Screenshots2](./Screenshots/Stage_1/Step_2/Part_1/2.png)

- You will see a success message.

![Screenshots3](./Screenshots/Stage_1/Step_2/Part_1/3.png)

- After the function is created, replace the function code with the code from [voting-app-store-vote.py](/aws-serverless-voting-app/01_LABSETUP/voting-app-store-vote.py)

![Screenshots4](./Screenshots/Stage_1/Step_2/Part_1/4.png)

- Click on Deploy. You will get a success message.
- **Note:** If you have used a different name for the DynamoDB table, change the **Table Name** in the code as well.

![Screenshots5](./Screenshots/Stage_1/Step_2/Part_1/5.png)

### **Part-2: Create a Lambda function to fetch the results from DynamoDB table and send it back to Frontend.**

- Create another lambda function. 

![Screenshots1](./Screenshots/Stage_1/Step_2/Part_2/1.png)

- For **Function Name** enter `voting-app-fetch-results`
- For **Runtime** select `Node.js 14.x`
- Leave all the other options as default and click on **Create Function**

![Screenshots2](./Screenshots/Stage_1/Step_2/Part_2/2.png)
![Screenshots3](./Screenshots/Stage_1/Step_2/Part_2/3.png)

- After the function is created, replace the function code with the code from [voting-app-fetch-results.js](/aws-serverless-voting-app/01_LABSETUP/voting-app-fetch-results.js)
- **Note:** If you have used a different name for the DynamoDB table, change the **Table Name** in the code as well.

![Screenshots4](./Screenshots/Stage_1/Step_2/Part_2/4.png)

- Click on Deploy. You will get a success message.

![Screenshots5](./Screenshots/Stage_1/Step_2/Part_2/5.png)

### **Part-3:** Create IAM permissions policy for both lambda functions [View Screenshots](./02_LABINSTRUCTIONS/Stage1_Step2_Part3.md)

By default the lambda functions will get a basic execution role to only send logs to cloudwatch. In order to update or fetch data from the DynamoDB table `Voting_Table`, the lambda functions need the required privileges. You need to create IAM permissions policy and attach it to the execution role of both lambda functions. **Note:** If you have used a different name for the DynamoDB table, change the table name in the below policy accordingly. Also add the region and your account ID in the JSON policy.

#### Permissions policy for lambda function `voting-app-store-vote`

- Move to the IAM console.

![Screenshots1](./Screenshots/Stage_1/Step_2/Part_3/1.png)

- Click on **Policies** and then **Create Policy**

![Screenshots2](./Screenshots/Stage_1/Step_2/Part_3/2.png)

- In the Create Policy page click on JSON and paste the following policy definition to the JSON editor. Update REGION and YOUR_AWS_ACCOUNTID

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DynamoDBUpdatePermissions",
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:UpdateItem"
            ],
            "Resource": "arn:aws:dynamodb:<REGION>:<YOUR_AWS_ACCOUNTID>:table/Voting_Table"
        }
    ]
}
```

![Screenshots3](./Screenshots/Stage_1/Step_2/Part_3/3.png)

- Click on **Next: Tags** and then click on **Next: Review**

![Screenshots4](./Screenshots/Stage_1/Step_2/Part_3/4.png)

- For **Policy Name** enter `voting-app-dynamodb-update-policy`
- Click on **Create Policy**. After the Policy is created you will get a success message

![Screenshots5](./Screenshots/Stage_1/Step_2/Part_3/5.png)
![Screenshots6](./Screenshots/Stage_1/Step_2/Part_3/6.png)

#### Permissions policy for lambda function `voting-app-fetch-results`

- Move to the IAM console. Click on **Policies** and then **Create Policy** to create another IAM policy.
- In the Create Policy page click on JSON and paste the following policy definition to the JSON editor. Update REGION and YOUR_AWS_ACCOUNTID

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DynamoDBScanPermissions",
            "Effect": "Allow",
            "Action": "dynamodb:Scan",
            "Resource": "arn:aws:dynamodb:<REGION>:<YOUR_AWS_ACCOUNTID>:table/Voting_Table"
        }
    ]
}
```
![Screenshots8](./Screenshots/Stage_1/Step_2/Part_3/8.png)

- Click on **Next: Tags** and then click on **Next: Review**

![Screenshots9](./Screenshots/Stage_1/Step_2/Part_3/9.png)

- For **Policy Name** enter `voting-app-scan-dynamodb-policy`
- Click on **Create Policy**. After the Policy is created you will get a success message

![Screenshots10](./Screenshots/Stage_1/Step_2/Part_3/10.png)
![Screenshots11](./Screenshots/Stage_1/Step_2/Part_3/11.png)

### **Part-4:** Attach the IAM policies to the Lambda execution role.




