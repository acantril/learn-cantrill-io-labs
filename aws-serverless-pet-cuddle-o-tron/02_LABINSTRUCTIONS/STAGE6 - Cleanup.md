# Advanced Demo Serverless Application - Pet-Cuddle-O-Tron
In this _Advanced Demo_ you will be implementing a serverless reminder application.
The application will load from an S3 bucket and run in browser
.. communicating with Lambda and Step functions via an API Gateway Endpoint
Using the application you will be able to configure reminders for 'pet cuddles' to be send using email and SMS.

This advanced demo consists of 6 stages :-

- STAGE 1 : Configure Simple Email service 
- STAGE 2 : Add a email lambda function to use SES to send emails for the serverless application 
- STAGE 3 : Implement and configure the state machine, the core of the application 
- STAGE 4 : Implement the API Gateway, API and supporting lambda function 
- STAGE 5 : Implement the static frontend application and test functionality 
- STAGE 6 : Cleanup the account **<= THIS STAGE**


In this stage you will cleanup all the resources created by this advanced demo.

# STAGE6 VIDEO GUIDE 
[STAGE6 VIDEO GUIDE](https://youtu.be/iGTkY0EThBM)


Move to the S3 console https://s3.console.aws.amazon.com/s3/home?region=us-east-1
Select the bucket you created  
Click `Empty`, type or copy/paste the bucket name and click `Empty`, Click `Exit`  
Click `Delete`, type or copy/paste the bucket name and click `Delete`, Click `Exit`

Move to the API Gateway console https://console.aws.amazon.com/apigateway/main/apis?region=us-east-1  
Check the box next to the `petcuddleotron` API  
Click `Actions` and then `Delete`  
Click `Delete`  

Move to the lambda console https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions  
Check the box next to `email_reminder_lambda`, click `Actions`, Click `Delete`, Click `Delete`  
Check the box next to `api_lambda`, click `Actions`, Click `Delete`, Click `Delete`  

Move to the Step Functions console https://console.aws.amazon.com/states/home?region=us-east-1#/statemachines  
Check the box next to `PetCuddleOTron`, CLick `Delete`, then `Delete state machine`  


Move to the Pinpoint console https://us-east-1.console.aws.amazon.com/pinpoint/home?region=us-east-1#/sms-account-settings/phoneNumbers  
Check the box next to the origination number you created in stage 1.  
Click `Remove Phone Number`, conform and click `Delete`  

Go to the SES console and verified identities https://us-east-1.console.aws.amazon.com/ses/home?region=us-east-1#/verified-identities  
Select one of the indentities, Click `Delete`, then click `Confirm`  
Pick the other verified identity, Click `Delete`, then click `Confirm`  


Move to the cloudformation console https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false  
Check the box next to `SMROLE` , click `Delete` then `Delete Stack`  
Check the box next to `LAMBDAROLE` , click `Delete` then `Delete Stack` 

AT this point you have removed all infrastructure used for this AdvancedDemo and have completed the advanced demo itself.

Good job !!

