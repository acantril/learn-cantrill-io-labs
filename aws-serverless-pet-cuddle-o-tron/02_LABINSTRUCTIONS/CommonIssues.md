# Common Issues - Cause

## STAGE1

There are no common problems at this stage. Just ensure that you verify two emails, the email the app will use to send, and the email you will be recieving email at for the demo.  

For production usage you would remove SES sandbox mode.  

## STAGE2

There are two main mistakes which can be made in stage 2.  

### Sending Email for the Pet Cuddle-O-Tron Application

In the lambda function code there is a placeholder which starts as:-
```
FROM_EMAIL_ADDRESS = 'REPLACE_ME'
```
The `REPLACE_ME` part **must** be replaced by the `PetCuddleOTron Sending Address` you noted down in Stage 1.  
If you don't do this, emails will never arrive when sent by the application.  

### Deploying the `email_reminder_lambda` function

After pasting the lambda function code, and updating the above placeholder you **need** to click `Deploy` to ensure the Lambda Function is deployed ready for use.  

## STAGE3

## STAGE4

## STAGE5
