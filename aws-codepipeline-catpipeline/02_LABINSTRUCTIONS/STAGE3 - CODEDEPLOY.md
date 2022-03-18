# STAGE 3 - CODE DEPLOY

In this stage, you will configure automated deployment of the cat pipeline application to ECS Fargate

## Create an S3 Bucket


## Configure a load balancer

First, you're going to create a load balancer which will be the entry point for the containerised application

Go to the EC2 Console (https://us-east-1.console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:) then Load Balancing -> Load Balancers -> Create Load Balancer.  
Create an application load balancer.  
Call it `catpipeline`  
Internet Facing
IPv4
For network, select your default VPC and pick at least 2 subnets.  
Create a new security group (this will open a new tab)
Call it `catpipeline-SG` and put the same for description
Delect the default VPC in the list
Add an inbound rule, select HTTP and for the source IP address choose 0.0.0.0/0
Create the security group.  

Return to the original tab, click the refresh icon next to the security group dropdown, and select `catpinepine-SG from the list` and remove the default security group.  

Under `listners and routing` make sure HTTP:80 is configured for the listner.  
Create a target group, this will open a new tab
call it `catpipelineA-TG`, ensure that `IP`, HTTP:80, HTTP1 and the default VPC are selected.  
Click next and then create the target group, for now we wont register any targets.  
create another target group with the same configuration called `catpipelineB-TG` while on the same tab
Return to the original tab, hit the refresh icon next to target group and pick `catpipelineA-TG` from the list.  
Then create the load balancer. 
This will take a few minutes to create, but you can continue on with the next part while this is creatign.


## Configure a Fargate cluster

Move to the ECS console (https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#/getStarted)
Clusters, Create a Cluster and it needs to be `Networking Only` (this will be using fargate)  
Move on, and name the cluster `allthecatapps`
We will be using the default VPC so there is no need to create one (don't check the box)
Create the cluster. **if you get a error at this point, it may be the first time you are using ECS and thats ok** exit the creation process and then rerun it. There is service activation happening behind the scenes when you first use it, and it can prevent you creating a cluster. exiting and retrying solves 99% of these issues, for the 1% wait 10 minutes and then repeat.


## Create Task and Container Definitions

Go to the ECS Cluster (https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#/clusters)  
Move to `Task Definitions` and create a task definition.  
Select Fargate and move on.  
Call it `catpipelinedemo` and for `operating system family` put `Linux`  
Select `ecsTaskExecutionRole` under task role.  
Pick `1GB` for task member and `0.5vCPU` for task CPU.  
Add Container
Container name `catpipeline`
For image put the URL to your image in ECR
	to get this, move to ECR console, repositories, click your repo, then click `Copy URI`
Add a port mapping `80` `tcp`
Add the container.
Create (_if you get an error here, click back and then create again_)  
View Task Definition & Click `JSON`, copy the json down somewhere as the `task definition json`  

## Test by running a task

Click Actions, run task.  
Launch type `fargate`
operating system family `Linux`  
Cluster `allthecatapps`
In `Cluster VPC` pick the default VPC, and pick a subnet from the dropdown
change `Auto-assign public IP` to `ENABLED`
Run Task
Wait for `Last Status` and `Desired Status` to both show running.  
Click the task.  
Locate the `Public IP` and open this in a browser ensuring you use http:// not https://





## DEPLOY TO ECS - FARGATE
