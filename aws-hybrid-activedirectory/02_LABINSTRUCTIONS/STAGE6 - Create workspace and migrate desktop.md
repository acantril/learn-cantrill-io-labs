# Advanced Hybrid Directory Demo

# STAGE 6A - CREATE WORKSPACES 
open [workspaces console](https://console.aws.amazon.com/workspaces/home?region=us-east-1#listworkspaces:)  

Click `Launch Workspaces`  
Set `Directory` to `aws.animals4life.org`  
Open the VPC Console ... and subnets  
Locate the `Private` subnets in the `AWS VPC`  
note down the CIDR's for the subnets `AWS-PRIVATE-A / AWS-PRIVATE-B / AWS-PRIVATE-C / AWS-PRIVATE-D`  

Subnet1 = 10.16.32.0/20  
Subnet2 = 10.16.160.0/20  

Click `Next Step`  
Next we need to provision a workspace for a given identity  

Change the `Select trust from forest` Dropdown to `ad.animals4life.org` which is the on-premises directory.  
Type `admin` in the search box and click `Search`   
Check the box next to `ad.animals4life.org\Admin` and click `Add selected`  
You will get an error ... because the on premises admin doesnt have a `First` or `Last` Name, or `email`  
Click `Close`  

Move across to the on-premises Jumpbox  
Open `Active Directory Users and Computers`  
Click `Users`  
Double Click `Admin`  
Add `Admin` as First name  
Add `Admin` as Last Name  
Add `YOUREMAIL` as the email  
Click `OK`  

Go back to the AWS Console  
Type `Admin` again, click search   
Check the box next to `ad.animals4life.org\Admin`  
Click `Add Selected`  
Click `Next Step`  
Check the box next to `Standard With Windows 10`  
Scroll down and click `next Step`  
Click `Launch Workspaces`  

Wait for the state to change from `Pending` to `Available`  

# STAGE 6B - Workspaces Client

go to https://clients.amazonworkspaces.com  
Download and install the client for your operating system  
Once installed, it will ask for the `Registration Code` which is available from the options on the workspace in the AWS console, enter that.  
Then .. wait for the workspace to finish provisioning  
Login using `A4L\Admin` and the password you entered at the start when creating the stack.  
Connect to the workspace  
Try accessing the DFS Namespace `\\ad.animals4life.org\private` and then clicking `a4lfiles`  
it fails ....  

This is because the workspace has a security group associated with it ... and this security group isn't allowed access to other resources by the `InstanceSG` Security Group   

Open the VPC Console... go to security Groups  
Locate the security group which has `workspaceMembers` note the ID  
Then edit the `InstanceSG` group  
on inbound rules  
Edit Rules  
Add Rule  
All Traffic  
destination .. the Security Group you noted down above  
Click `Save Rules`  

Move back to the workspace .... now you should be able to access the DFS Namespace  

# STAGE 6 - FINISH

