# Serverless Voting Application

In this mini project you will create a completely serverless voting application in two stages. First you will create the backend using API Gateway, Lambda functions and DynamoDB table. Then you will create the frontend application using ReactJS and deploy it to an S3 bucket for static website hosting which will be delivered using CloudFront CDN. Below is the architecture for this project.

![Architecture](Architecture-ServerlessVotingApp.png)

# Stage 1 - Backend

Choose a region where you want to deploy the application and use the same region for creating all the resources in below stages.

## Step 1 - Create a DynamoDB table [View Screenshots](./02_LABINSTRUCTIONS/Stage1_Step1.md)

- Move to the DynamoDB console to create a new table
- For **Table Name** enter `Voting_Table`
- For **Partition key** enter `vote_id` of type string
- Leave all the other options as default and click on **Create Table**
- After the DynamoDB table is created you will get a success message

## Step 2 - Create Lambda Functions

### **Part-1: Create a Lambda function to fetch the vote from frontend and store it in DynamoDB table.** [View Screenshots](./02_LABINSTRUCTIONS/Stage1_Step2_Part1.md)

- Move to the Lambda console and click on **Create Function** 
- For **Function Name** enter `voting-app-store-vote`
- For **Runtime** select `Python 3.9`
- Leave all the other options as default and click on **Create Function**
- After the function is created, replace the function code with the code from [voting-app-store-vote.py](./01_LABSETUP/voting-app-store-vote.py)
- **Note:** If you have used a different name for the DynamoDB table, change the table name in the code.

### **Part-2:** Create an IAM permissions policy and attach it to the execution role of the lambda function `voting-app-store-vote` [View Screenshots](./02_LABINSTRUCTIONS/Stage1_Step2_Part2.md)

By default the lambda function gets a basic execution role to only send logs to cloudwatch. In order to update the DynamoDB table `Voting_Table` that was created in step-1, the function needs the required privileges. You will need to create an IAM permissions policy and attach it to the lambda execution role.

- Move to the IAM console.
- Click on **Policies** and then **Create Policy**
- In the Create Policy page click on JSON and paste the following policy definition to the JSON editor. **Note:** If you have used a different name for the DynamoDB table, change the table name in the policy accordingly. Also add the region and your account ID in the JSON policy.

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

- Click on **Next: Tags** and then click on **Next: Review**
- For **Policy Name** enter `voting-app-dynamodb-update-policy`
- Click on **Create Policy**. After the Policy is created you will get a success message




voting-app-scan-dynamodb-policy

