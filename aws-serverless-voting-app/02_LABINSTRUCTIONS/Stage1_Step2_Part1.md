# Stage-1 Serverless Voting Application

## Step 2 - Create Lambda Functions

### **Part-1: Create a Lambda function to fetch the vote from frontend and store it in DynamoDB table.** [View Screenshots](./02_LABINSTRUCTIONS/Stage1_Step2_Part1.md)

- Move to the Lambda console and click on **Create Function** 

![Screenshots1](Stage1_Step2_Part1.1.png)

- For **Function Name** enter `voting-app-store-vote`
- For **Runtime** select `Python 3.9`
- Leave all the other options as default and click on **Create Function**

![Screenshots2](Stage1_Step2_Part1.2.png)

![Screenshots3](Stage1_Step2_Part1.3.png)

- By default the lambda function gets a basic execution role to only send logs to cloudwatch.
- In order to update the DynamoDB table you will need to create an IAM permissions policy and attach it to the lambda execution role, which grants only the required privileges to update the DynamoDB table `Voting_Table` that was created in step-1.





