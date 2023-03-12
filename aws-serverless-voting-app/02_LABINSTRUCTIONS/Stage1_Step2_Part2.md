# Stage-1 Backend

## Step 2 - Create Lambda Functions

### **Part-2: Create a Lambda function to fetch the results from DynamoDB table and send it back to Frontend.**

- Create another lambda function. 

![Screenshots1](./Screenshots/Stage_1/Step_2/Part_2/1.png)

- For **Function Name** enter `voting-app-fetch-results`
- For **Runtime** select `Node.js 14.x`
- Leave all the other options as default and click on **Create Function**

![Screenshots2](./Screenshots/Stage_1/Step_2/Part_2/2.png)
![Screenshots3](./Screenshots/Stage_1/Step_2/Part_2/3.png)

- After the function is created, replace the function code with the code from [voting-app-fetch-results.js](/aws-serverless-voting-app/01_LABSETUP/voting-app-fetch-results.js)

![Screenshots4](./Screenshots/Stage_1/Step_2/Part_2/4.png)

- Click on Deploy. You will get a success message.
- **Note:** If you have used a different name for the DynamoDB table, change the **Table Name** in the code as well.

![Screenshots5](./Screenshots/Stage_1/Step_2/Part_2/5.png)
