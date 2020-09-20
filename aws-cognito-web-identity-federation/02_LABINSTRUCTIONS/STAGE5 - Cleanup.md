# Advanced Demo - Web Identity Federation

**In this advanced demo you will be migrating a simple web application (wordpress) from an on-premises environment into AWS.  
The on-premises environment is a virtual web server (simulated using EC2) and a self-managed mariaDB database server (also simulated via EC2)  
You will be migrating this into AWS and running the architecture on an EC2 webserver and RDS managed SQL database.**  

This advanced demo consists of 6 stages :-

- STAGE 1 : Provision the environment and review tasks 
- STAGE 2 : Create Google APIProject & ClientID 
- STAGE 3 : Create Cognito Identity Pool
- STAGE 4 : Update App Bucket & Test Application 
- STAGE 5 : Cleanup the account **<= THIS STAGE**

# STAGE 5A - Delete the Google API Project & Credentials
https://console.developers.google.com/cloud-resource-manager 
Select `PetIDF` and click `DELETE`  
Type in the ID of the project, which might have a slightly different name (shown above the text box) click `Shut Down`  


# STAGE 5B - Delete the Cognito ID Pool
Move to the cognito console https://console.aws.amazon.com/cognito/home?region=us-east-1  
Click `Manage Identity Pools`  
Click on `PetIDFIDPool`  
Click `Edit Identity Pool`  
Locate and expand `Delete identity pool`  
Click `Delete Identity Pool`  
Click `Delete Pool`  

# STAGE 5c - Delete the IAM Roles
Move to the IAM Console https://console.aws.amazon.com/iam/home?region=us-east-1#/home  
Select `Roles`  
Select both `Cognito_PetIDF*` roles  
Click `Delete Role`  
Click `Yes Delete`  

# STAGE 5C - Delete the CloudFormation Stack
Move to the cloud formation console https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false  
Select `WEBIDF`, click `Delete` then `Delete Stack`  

# STAGE 5 - FINISH  
- template front end app bucket
- Configured Google API Project
- Credentials to access it
- Cognito ID Pool
- IAM Roles for the ID Pool





