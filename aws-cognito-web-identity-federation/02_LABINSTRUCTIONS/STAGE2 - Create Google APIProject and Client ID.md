# Advanced Demo - Web Identity Federation

In this advanced demo series you will be implementing a simple serverless application which uses Web Identity Federation.  
The application runs using the following technologies  

- S3 for front-end application hosting  
- Google API Project as an ID Provider  
- Cognito and IAM Roles to swap Google Token for AWS credentials  

The application runs from a browser, gets the user to login using a Google ID and then loads all images from a private S3 bucket into a browser using presignedURLs.  

This advanced demo consists of 5 stages :-  

- STAGE 1 : Provision the environment and review tasks   
- STAGE 2 : Create Google API Project & Client ID **<= THIS STAGE**  
- STAGE 3 : Create Cognito Identity Pool  
- STAGE 4 : Update App Bucket & Test Application  
- STAGE 5 : Cleanup the account  

![Stage2- PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-cognito-web-identity-federation/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE2.png)  


# STAGE 2A - Create Google API PROJECT  

Any application that uses OAuth 2.0 to access Google APIs must have authorization credentials that identify the application to Google's OAuth 2.0 server  
In this stage we need to create those authorization credentials.  

You will need a valid google login, GMAIL will do.  
If you don't have one, you will need to create one as part of this process.  
Move to the Google Credentials page https://console.developers.google.com/apis/credentials    
Either sign in, or create a google account  

You will be moved to the `Google API Console`    
You may have to set your country and agree to some terms and conditions, thats fine go ahead and do that.    
Click the `Select a project` dropdown, and then click `NEW PROJECT`   
For project name enter `PetIDF`  
Click `Create`    

# STAGE 2B - Configure Consent Screen  
Click `Credentials`  
Click `CONFIGURE CONSENT SCREEN`    
because our application will be usable by any google user, we have to select external users  
Check the box next to `External` and click `CREATE`  
Next you need to give the application a name ... enter `PetIDF` in the `App Name` box.   
enter your own email in `user support email`  
enter your own email in `Developer contact information`  
Click `SAVE AND CONTINUE`   
Click `SAVE AND CONTINUE`  
Click `SAVE AND CONTINUE`  
Click `BACK TO DASHBOARD`    


# STAGE 2C - Create Google API PROJECT CREDENTIALS  

Click `Credentials` on the menu on the left   
Click `CREATE CREDENTIALS` and then `OAuth client ID`   
In the `Application type download` select `Web Application`   
Under Name enter `PetIDFServerlessApp`  

We need to add the S3 bucket URL, this is the Static Website Hosting Endpoints you noted down earlier.   
Click `ADD URI` under `Authorized JavaScript origins`   
Enter the endpoint URL, you need to enter the `Distribution DNS Name` of your CloudFront distribution (created by the 1-click deployment), you should add https:// at the start,  it should look something like this `https://d38sv1tnkmk8i6.cloudfront.net` but you NEED to use your own distributions DNS name **DONT USE THIS ONE**  
Click `CREATE`  

You will be presented with two pieces of information  

- `Client ID`  
- `Client Secret`  

Note down the `Client ID` you will need it later.  
You wont need the `Client Secret` again.  
Once they are noted down safely, click `OK`   

# STAGE 2 - FINISH  

- template front end app bucket
- Configured Google API Project
- Credentials to access it





