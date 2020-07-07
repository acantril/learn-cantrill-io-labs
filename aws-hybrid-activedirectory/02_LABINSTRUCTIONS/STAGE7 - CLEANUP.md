# Advanced Hybrid Directory Demo

# STAGE 7a - Remove Security Group Entry from InstanceSG  
Move to the VPC Console and Security Groups https://console.aws.amazon.com/vpc/home?region=us-east-1#SecurityGroups:  
Locate the InstanceSG security Group  
Note down the SG ID of the SG ending 'workspacesMembers'  
Edit the Inbound rules of the InstanceSG security Group   
Remove the ALLTRAFFIC rule with the workspacesMembers SG as destination.  
Save

# STAGE 7b DELETE WORKSPACES  
Move to the workspaces console  
Select the workspace you provisioned earlier  
Click actions, remove workspaces   
Click `Remove Workspaces` to confirm the deletion.   

# STAGE 7c Delete the AWS Jumpbox

Go here https://console.aws.amazon.com/ec2/home?region=us-east-1#Instances:sort=instanceState  
Right Click `Jumpbox-AWS`, Instance State, Terminate, Click `Yes, terminate`  

# STAGE 7d DELETE FSX  
go here https://console.aws.amazon.com/fsx/home?region=us-east-1#file-system-details  
select the file system  
Actions Delete  
No final backup   
Acknowledge  
Type or Paste file system ID   
Click Delete File System  

# Stage 7e - Deregister Directory  
In the workspaces console  
Click Directory  
Select the directory  
Click Actions  
Deregister  

# STAGE 7f DELETE DIRECTORY
Wait for the workspaces to be removed  
Wait for FSx To finish deleting  

go here https://console.aws.amazon.com/directoryservicev2/home?region=us-east-1#!/directories  
Click the directory  
Actions -> Delete the Directory  
Type/Paste in the directory  
Click Delete  

# STAGE 7c DELETE CFN STACK
Wait for the directory to finish deleting.  
Once done, move to the cloudformation console   
https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false  
Select the `NON NESTED` stack  
Click `Delete` and then `Delete Stack`  

# Stage 7 FINISH

That concludes the demo lesson  

