# Stage 2 - Frontend

### **Part-1:** Create S3 bucket for website hosting

- Move to the S3 bucket console and create a new S3 bucket with name `serverless-voting-app-demo`
- Choose a region where you have created the backend resources in stage-1

![Screenshots](./Screenshots/Stage_2/1.png)

![Screenshots](./Screenshots/Stage_2/2.png)

- Under **Block public access settings** uncheck all ticks and select the acknowledge option.

![Screenshots](./Screenshots/Stage_2/3.png)

- Leave the other options as default and click on **Create Bucket**

![Screenshots](./Screenshots/Stage_2/4.png)

- Under **Properties** scroll down to the **Static Website Hosting**

![Screenshots](./Screenshots/Stage_2/5.png)

![Screenshots](./Screenshots/Stage_2/6.png)

- Click edit and select the options as shown below.

![Screenshots](./Screenshots/Stage_2/7.png)

![Screenshots](./Screenshots/Stage_2/8.png)

![Screenshots](./Screenshots/Stage_2/9.png)

- After the changes are saved, you will be able to see the **Bucket website endpoint**

![Screenshots](./Screenshots/Stage_2/10.png)

- Under **Permissions** Edit the bucket policy. Copy the below policy and click on **Save Changes**

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::serverless-voting-app-demo/*"
        }
    ]
}
```

![Screenshots](./Screenshots/Stage_2/11.png)

![Screenshots](./Screenshots/Stage_2/12.png)

![Screenshots](./Screenshots/Stage_2/13.png)

![Screenshots](./Screenshots/Stage_2/14.png)


### **Part-2:** Create a Cloud9 IDE to edit the Frontend Javascript code, build the React application and deploy to S3 bucket.

- Open the Cloud9 IDE and create a new environment.

![Screenshots](./Screenshots/Stage_2/15.png)

![Screenshots](./Screenshots/Stage_2/16.png)

- Enter any name for the IDE and leave all the other default options and click on create

![Screenshots](./Screenshots/Stage_2/17.png)

![Screenshots](./Screenshots/Stage_2/18.png)

![Screenshots](./Screenshots/Stage_2/19.png)

- The IDE will be available in few minutes.

![Screenshots](./Screenshots/Stage_2/20.png)

![Screenshots](./Screenshots/Stage_2/21.png)

- Once it is ready, open the IDE and you will see a terminal where you can run linux commands.

![Screenshots](./Screenshots/Stage_2/22.png)

- Run the below commands

```
sudo yum install -y nodejs
node -v
wget https://github.com/ashish3121990/learn-cantrill-io-labs/raw/67c637eb01f752a260a9e246b1a62df5d76b3a14/aws-serverless-voting-app/01_LABSETUP/voting-app-frontend.zip
unzip voting-app-frontend.zip
cd voting-app-frontend
```

![Screenshots](./Screenshots/Stage_2/23.png)

- As shown in the [screenshots](/aws-serverless-voting-app/02_LABINSTRUCTIONS/readme_stage2_screenshots.md), expand the folder `voting-app-frontend` from the left side file explorer of the IDE.
- Inside src, there is a `Vote.js` file. Open the file.
- You will see that, there are two urls configured in the code `vote_url` for `vote` and `results_fetchurl` for `fetch results`
- Replace these two URL's with the two urls that you received at the end of stage-1 after creating the API Gateway deployment.

![Screenshots](./Screenshots/Stage_2/24.png)

- Save the file with CTRL+S
- In the terminal, run the below commands

```
npm update
npm run build
```

![Screenshots](./Screenshots/Stage_2/25.png)

![Screenshots](./Screenshots/Stage_2/26.png)

![Screenshots](./Screenshots/Stage_2/27.png)

- Now you can run the below commands to copy the contents of the build folder to the s3 bucket

```
cd build
aws s3 cp . 's3://serverless-voting-app-demo' --recursive
```

![Screenshots](./Screenshots/Stage_2/28.png)

- In the S3 bucket refresh to see the newly copied files.

![Screenshots](./Screenshots/Stage_2/29.png)

- Try to access the webpage with the **Bucket website endpoint**

![Screenshots](./Screenshots/Stage_2/30.png)
