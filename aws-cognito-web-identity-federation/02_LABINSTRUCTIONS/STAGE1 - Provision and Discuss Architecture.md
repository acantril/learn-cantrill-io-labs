# Advanced Demo - Web Identity Federation

In this advanced demo series you will be implementing a simple serverless application which uses Web Identity Federation.  
The application runs using the following technologies

- S3 for front-end application hosting
- Google API Project as an ID Provider
- Cognito and IAM Roles to swap Google Token for AWS credentials

The application runs from a browser, gets the user to login using a Google ID and then loads all images from a private S3 bucket into a browser using presignedURLs.  

This advanced demo consists of 6 stages :-  

- STAGE 1 : Provision the environment and review tasks **<= THIS STAGE**   
- STAGE 2 : Create Google API Project & Client ID  
- STAGE 3 : Create Cognito Identity Pool  
- STAGE 4 : Update App Bucket & Test Application  
- STAGE 5 : Cleanup the account  

![Stage1 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-cognito-web-identity-federation/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE1.png)  


# STAGE 1A - Login to an AWS Account    

Login to an AWS account using a user with admin privileges and ensure your region is set to `us-east-1` `N. Virginia`  
Click [HERE](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-cognito-web-identity-federation/WEBIDF.yaml&stackName=WEBIDF) to auto configure the VPC which WordPress will run from  

Wait for the STACK to move into the `CREATE_COMPLETE` state before continuing.  

# STAGE 1B - Verify S3 bucket  

Open the S3 console https://s3.console.aws.amazon.com/s3/home?region=us-east-1    
Open the bucket starting `webidf-appbucket`   
It should have objects within it, including `index.html` and `scripts.js`  
Click the `Permissions` Tab  
Verify `Block all public access` is set to `Off`  
Click `Bucket Policy`  
Verify there is a bucket policy  
Click `Properties Tab`  
Click `Static Website Hosting`  
Verify this is enabled  

Note down the `Endpoint` you will need later.  

# STAGE 1C - Verify privatebucket
Open the bucket starting `webidf-patchesprivatebucket-`  
Load the objects in the bucket so you are aware of the contents  
Verify there is no bucket policy and the bucket is entirely private.   


# STAGE 1 - FINISH  

- front end app bucket
- privatepatches bucket  






