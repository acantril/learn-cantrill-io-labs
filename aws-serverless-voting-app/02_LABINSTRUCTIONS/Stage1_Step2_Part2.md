# Stage-1 Serverless Voting Application

## Step 2 - Create Lambda Functions

### **Part-2:** Create an IAM permissions policy and attach it to the execution role of the lambda function `voting-app-store-vote` [View Screenshots](./02_LABINSTRUCTIONS/Stage1_Step2_Part2.md)

In order to update the DynamoDB table you will need to create an IAM permissions policy and attach it to the lambda execution role, which grants only the required privileges to update the DynamoDB table `Voting_Table` that was created in step-1.

- Move to the IAM console.

