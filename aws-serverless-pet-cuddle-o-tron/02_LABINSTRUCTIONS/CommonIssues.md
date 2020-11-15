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

After pasting the lambda function code, and updating the above placeholder you **need** to click `Deploy` to ensure the Lambda Function is deployed ready for use. If you don't deploy, the generic `Hello World` lambda function will run and emails wont be sent.  

## STAGE3

In Stage3 there are two placeholders you need to replace in the ASL for the `PetCuddleOTron` State Machine.  

inside here :-

```
    "EmailOnly": {
      "Type" : "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "FunctionName": "EMAIL_LAMBDA_ARN",
        "Payload": {
          "Input.$": "$"
        }
      },
      "Next": "NextState"
    },
```

You need to replace `EMAIL_LAMBDA_ARN` with the ARN of the `email_reminder_lambda` Lambda function.  
**AND**
inside here :-
```
    "EmailandSMS": {
      "Type": "Parallel",
      "Branches": [
        {
          "StartAt": "ParallelEmail",
          "States": {
            "ParallelEmail": {
              "Type" : "Task",
              "Resource": "arn:aws:states:::lambda:invoke",
              "Parameters": {
                "FunctionName": "EMAIL_LAMBDA_ARN",
                "Payload": {
                  "Input.$": "$"
                }
              },
              "End": true
            }
          }
        },
```
You need to replace `EMAIL_LAMBDA_ARN` with the ARN of the `email_reminder_lambda` Lambda function. 
Failure to do either of these will result in the step function failing, no emails will be sent.  

## STAGE4

## STAGE5
