# Demo - VPC Lambda & EFS Demo

Welcome to this Demo, where you will get experience of working with VPC Based Lambda using an EFS File system.  
There are a number of key steps in the demo:-  

- Provision the environment using the 1-click deployment below
- Verify the EC2 instances and EFS are operating normally
- Configure an `EFS Access point` (which lambda will use to connect)
- Create the `catdownloader` lambda function
- Setup a `schedule-based` EventBridge rule
- Verify Output
- cleanup


# STAGE 1A - Login to an AWS Account    
Login to an AWS account and select the `N. Virginia // us-east-1 region`    

# STAGE 1B - APPLY CloudFormation (CFN) Stack  
Applying the cloudformation template will create the DEMO VPC, 3 Public Subnets, an ASG and LT which will bootstrap some simple web servers and an application load balancer which runs in each AZ and has **NO STICKINESS*  

Click https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-simple-demos/aws-lambda-vpc-efs/A4LVPC.yaml&stackName=LAMBDAVPC  

Check the box for `capabilities: [AWS::IAM::Role]`
Click `Create Stack`

# STAGE 1C - Verify EFS

Move to the EFS Console https://console.aws.amazon.com/efs/home?region=us-east-1  
Click on the `EFS / LAMBDAVPC` file system  
Click on the `Network` tab and verify that there are mount targets in both `us-east-1a` and `us-east-1b`  
This is the EFS file system which both the EC2 webservers and lambda function will load and storage images on.  

# STAGE 1D - Verify the webserver is running on each instance
Move to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:  
Click `Instances`  
Select each instance inturn  
Copy the `Public DNS (IPv4)` into your clipboard and open it in a new tab  
Do this for both running instances  

**each instance should show a webpage, with no images - they load images from EFS**

# STAGE 1E - Create EFS Access point

Return to the EFS Console https://console.aws.amazon.com/efs/home?region=us-east-1  
Click on the `EFS / LAMBDAVPC` file system 
Click on the `Access Points` tab  
Click `Create access point`  
for `Name - optional` enter `catdownloader`
for `Root directory path - optional` leave blank which defaults to `/`  
Enter `1000` for `User ID`  
Enter `1000` for `Group ID`   
Enter `1000` for `Owner user ID`   
Enter `1000` for `Owner group ID`  
Enter `0777` for `Permissions`  
Click `Create access point`  

# STAGE 1F - Create the `catdownloader` lambda function

Open the Lambda console https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions  
Click `Create function`  
Choose `Author from Scratch`  
For `Function Name` choose `catdownloader`  
For `Runtime` choose `Python 3.8`  
Expand `Choose or create an execution role`  
Check `Use an existing role`  
choose `LAMBDAVPC-LambdaRole-` in the dropdown (there will be random at the end, that's ok)  
Click `Create function`  

Scroll down to `Basic settings`  
Click `Edit`  
For timeout set `1` minute `0` seconds  
Click `Save`



# STAGE 1G - Configure VPC Network Access

Scroll down to `VPC` and click `Edit`  
check the box next to `Custom VPC`  
Select the `A4LVPC` from the `VPC` dropdown  
Choose `SubnetPRIVATEA` and `SubnetPRIVATEB` in the `Subnets` dropdown  
in the `Security groups` dropdown, select `SGWEB`  
Click `Save`  

**it will show Updating the function catdownloader.** wait for this to change to success. 
It might take a short while.  This part is allocating ENI's within the VPC subnets...  

# STAGE 1H - Configure EFS Access

Scroll down to `File system`  
Click `Add file system`  
in the `EFS file system` dropdown, select `EFS / LAMBDAVPC`  
in the `Access point` dropdown, select `catdownloader`  
in the `Local mount path` box, type `/mnt/efs` (this controls where the EFS is mounted in the lambda environment)  
Click `Save` (it might take a short while until you can click save ... that's ok)

# STAGE 1I - Add Lambda code

Select all the code in the lambda code box and delete it.
Paste in the code below  


```
import base64
import logging
import os
import json
import boto3
import urllib3
import uuid

logging.basicConfig()
log = logging.getLogger() 
log.setLevel(logging.INFO)


def lambda_handler(event, context):
    urls = []
    http = urllib3.PoolManager()
    
    for i in range(10):
        r = http.request('GET', 'http://thecatapi.com/api/images/get?size=medformat=src&type=png&api_key=8f7dc437-0b9b-47b8-a2c0-65925d593acf')
        with open('/mnt/efs/'+str(uuid.uuid1())+".png", "wb" ) as png:
            png.write(r.data)
    
        
    return {
        'statusCode': 200,
    }

```

Click `Save`  
Click `Test` and under `Event name` enter `catdownloadertest` and click `Create`  
Click `Test`   

Scroll to the top ... wait for it to show `Execution result: succeeded`  
Expand `Details`  
Check the `Log output` it will show calls to the cat API  
Go to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
Click on one of the instances  
Copy its `Public IPv4 DNS`  
Open it in a new tab  
You should see cats ... and all is good in the world
These are being loaded from `EFS` where the lambda function just downloaded and wrote them too.  
Imagine if these were huge files .. or files requiring processing, there is no way this could fit in the 512MB limit for the lambda runtime environment  



# STAGE 1J - Add Schedule

Move to EventBridge Console https://console.aws.amazon.com/events/home?region=us-east-1  
Click `Create Rule`  
for `Name` enter `catsevery2minutes` 
for `Define pattern` choose `Schedule`  
Pick `Fixed rate every` and then choose `2` and `minutes`  
Scroll down to `Select targets`  
Under `Target` choose `Lambda Function`  
Under `Function` choose `catdownloader`  
Click `Create`  

**wait 10 minutes or so**

# STAGE 1K - Cleanup

Go to event rules https://console.aws.amazon.com/events/home?region=us-east-1#/rules  
Select the `catsevery2minutes` rule , click `Delete` and `Delete` again  
Go to the lambda console https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions  
Select the `catdownloader` function, click `Actions` then `Delete` and then `Delete` again 
**wait until you see `    Your Lambda function "catdownloader" was successfully deleted.`** 

Move to the EFS COnsole https://console.aws.amazon.com/efs/home?region=us-east-1#/
Click `EFS / LAMBDA`  
Click `Access Points`  
Select the `catdownloader` access point, click `Delete` then `Confirm` 
Wait for it to fully finish

go to EC2 console and ENI https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#NIC:sort=description
Locate any ENI's starting with `AWS Lambda VPC ENI-catdownloader`, select them, detach them, checking force detact, click `Yes, Detacch` (force detach)
If detach doesnt work, you might have to delete
if they aren't visible thats ok
**this is a lambda in VPC bug - these interfaces might take some time to delete normally**


Move to the cloudformation console https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false  
Select the `LAMBDAVPC` stack, click `Delete` and then `Delete STack`








