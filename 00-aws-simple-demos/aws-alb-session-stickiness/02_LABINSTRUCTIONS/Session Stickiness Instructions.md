# Demo - Application Load Balancer (ALB) - Session Stickiness  

Welcome to this Demo, where you will get experience of working with ALB session stickiness using an ALB managed session cookie `AWSALB`. 
There are a number of key steps in the demo:-  

- Provision the environment using the 1-click deployment below
- Verify functionality of all EC2 instances
- Access the load balancer using the `DNS Name` and verify that connections are distributed across targets in the ALB Target group.
- Enable session stickiness
- verify that your session is locked to one instance
- explore the cookie
- shutdown the instance you are locked too
- verify that your session moves to another instance
- disable stickiness and confirm your connections are distributed again
- cleanup

# STAGE 1A - Login to an AWS Account    
Login to an AWS account and select the `N. Virginia // us-east-1 region`    

# STAGE 1B - APPLY CloudFormation (CFN) Stack  
Applying the cloudformation template will create the DEMO VPC, 3 Public Subnets, an ASG and LT which will bootstrap some simple web servers and an application load balancer which runs in each AZ and has **NO STICKINESS*  

Click https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-simple-demos/aws-alb-session-stickiness/ALBSTICKINESS.yaml&stackName=ALB  

Check the box for `capabilities: [AWS::IAM::Role]`
Click `Create Stack`

The stack will take 5-10 minutes to apply and will need to be in a `CREATE_COMPLETE` state before you can continue.  

# STAGE 1C - Verify the webserver is running on each instance
Move to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:  
Click `Instances`  
Select each instance inturn  
Copy the `Public DNS (IPv4)` into your clipboard and open it in a new tab  
Do this for all 6 running instances  

**each instance should show a webpage, with a random coloured background, an instance ID and a random cat picture**  


# STAGE 1D - Access the load balancer using the `DNS Name`
Move to the load balancer area of the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#LoadBalancers:  
Select the `ALB-ALB-RANDOM` load balancer   
On the `Description` tab below, copy the `DNS name` in your clipboard and open it in a new tab  
It should load a website ... one of the 6 you opened manually in the previous step  
Refresh it .. it should change between all the 6 different pages and cat images  
It may take some time and initially only cycle between 3... but eventually it should move between all 6  
Don't worry if it shows 3, thats enough to continue with the next demo steps  

**session stickiness is NOT enabled so sessions are being distributed across all targets in the ALB target group**   

# STAGE 1E - Enable session stickiness

From the load balancer Target Group area of the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#TargetGroups:  
Click the `ALB-ALBTG-RANDOM` load balancer target group   
Make sure the `Group Details` tab is selected  
Scroll down to `Attributes` and click `Edit`  
Check the `Stickiness` box, set the `Duration` to `1 minute` and click `Save changes`  

**Stickiness is now enabled**

# STAGE 1F - Verify that your session is locked to one instance and explore the session cookie
Move back to the tab which you have open to the load balancer  
Refresh it a few times  
After a few refreshes it will lock onto one specific backend instance
if you are using firefox as a browser, you can click `Tools` -> `Web Developer` -> `Storage Inspector` and see the `AWSALB` cookie which is locking you to this one backend instance.  
You will be locked to this instance until either the cookie expires ... or the instance fails its health check  


# STAGE 1G - Shutdown the instance and confirm you are locked to another instance
Note down the instanceID of the instance you are locked to. It should be above the cat gif on the page you are looking at.  
Move back to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
locate that instanceID & Select it.  
Right Click `Instance State` and then `Stop`. Click `Yes, Stop` to confirm.  
Go back to the load balancer tab  
Keep clicking refresh  
Note that after a while .. you move to a new instance.  
Click refresh again  
and a few more times  
Move back to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState
Locate the stopped instance  
Right Click `Instance State` and then `Start`. Click `Yes, Start` to confirm.  
Go back to the load balancer tab  
Keep refreshing  
You are still locked to the new instance, you don't return to the old one.  


# STAGE 1H - Disable Stickiness and confirm sessions are distributed again
From the load balancer Target Group area of the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#TargetGroups:  
Click the `ALB-ALBTG-RANDOM` load balancer target group   
Make sure the `Group Details` tab is selected  
Scroll down to `Attributes` and click `Edit`  
Un-Check the `Stickiness` box, and click `Save changes` 

Go back to the load balancer tab  
Keep refreshing  
You should start to move freely between all of the instances again  


# STAGE 1I - Delete the cloudformation template and cleanup
Move back to the cloudformation console https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false  
check the box next to the `ALB` stack  
Click `Delete` then `Delete stack`  

**Congratulations you have completed this demo lesson**
