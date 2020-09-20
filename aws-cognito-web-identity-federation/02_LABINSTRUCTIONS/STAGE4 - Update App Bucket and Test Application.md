# Advanced Demo - Web Identity Federation

**In this advanced demo you will be migrating a simple web application (wordpress) from an on-premises environment into AWS.  
The on-premises environment is a virtual web server (simulated using EC2) and a self-managed mariaDB database server (also simulated via EC2)  
You will be migrating this into AWS and running the architecture on an EC2 webserver and RDS managed SQL database.**  

This advanced demo consists of 6 stages :-

- STAGE 1 : Provision the environment and review tasks 
- STAGE 2 : Create Google APIProject & ClientID 
- STAGE 3 : Create Cognito Identity Pool
- STAGE 4 : Update App Bucket & Test Application **<= THIS STAGE**
- STAGE 5 : Cleanup the account

![Stage1 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-cognito-web-identity-federation/02_LABINSTRUCTIONS/thinghere.png)


# STAGE 4A - Download index.html and scripts.js from the S3 

Move to the S3 Console https://s3.console.aws.amazon.com/s3/home?region=us-east-1  
Open the `webidf-appbucket-` bucket  
select `index.html` and click `Download` & save the file locally
select `scripts.js` and click `Download` & save the file locally

# STAGE 4B - Update files with your specific connection information

Open the local copy of `index.html` in a code editor.  
Locate the `XXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com` placeholder  
Replace this with YOUR CLIENT ID
Save `index.html`

Open the local copy of `scripts.js` in a code editor. 
Locate the `AWS.config.region = 'XX-XXXX-X';` placeholder  
Replace `XX-XXXX-X` with `us-east-1`   
Locate the IdentityPoolId: `IdentityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'` placeholder  
Replace the `XXXXX` part with your IDENTITY POOL ID you noted down in the previous step
Save `scripts.js`

# STAGE 4C - Upload files

Back on the S3 console, inside the `webidf-appbucket-` bucket.  
Click `Upload`  
Add the `index.html` and `scripts.js` files and click `Upload`  

# STAGE 4C - Test application

Open the S3 bucket static hosting endpoint which you noted down earlier.
it should show a simple webpage



# STAGE 4 - FINISH  

- template front end app bucket
- Configured Google API Project
- Credentials to access it
- Cognito ID Pool
- IAM Roles for the ID Pool





