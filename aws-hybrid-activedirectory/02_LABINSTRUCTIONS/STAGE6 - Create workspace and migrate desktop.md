# Advanced Hybrid Directory Demo

# STAGE 6A - CREATE WORKSPACES 
open [https://us-east-1.console.aws.amazon.com/workspaces/v2/workspaces?region=us-east-1](https://us-east-1.console.aws.amazon.com/workspaces/v2/workspaces?region=us-east-1)  

Click `Create Workspaces`  
Set `Directory` to `aws.animals4life.org` 
Open the VPC Console ... and subnets  
Locate the `Private` subnets in the `AWS VPC`  
note down the CIDR's for the subnets `AWS-PRIVATE-A / AWS-PRIVATE-B / AWS-PRIVATE-C / AWS-PRIVATE-D`  

Subnet1 = 10.16.32.0/20  
Subnet2 = 10.16.160.0/20  

Back on the Create Workspaces click `register`
Enter two private subnets click `register` 

Click `Next`  
Next we need to provision a workspace for a given identity  

Change the `Trusted Domains` Dropdown to `ad.animals4life.org` which is the on-premises directory.  
Click `Next`
Type `admin` in the search box and click `Search`   
Check the box next to `ad.animals4life.org\Admin` and click `Add selected`  
You will get an error ... because the on premises admin doesnt have a `First` or `Last` Name, or `email`  
Click `Close`  

Move across to the on-premises Jumpbox  
Open `Active Directory Users and Computers`  
Right Click `Users`
Click `New` -> `User`
Add `A4LAdmin` as First name, Last name, Full name and User logon Name
Add `YOUREMAIL` as the email 
Click `Next`
Add `YOURPASSWORD`
Uncheck `User must change password at next logon`
Check `Password never expires` and `Allow user to change password`
Click `Next`
Click `Finish`  

Add the new user to the correct groups
Right Click your new `A4LAdmin`
Select the `Member Of` tab
Click `Add`
Type `domain admins; enterprise admins` in the object name box
Click `Check Names`
Click `Ok`

Go back to the AWS Console  
Type `A4LAdmin` again, click search   
Check the box next to `A4LAdmin`  
Click `Next`  
Check the box next to `Standard With Windows 10`  
Click `Next`  
Click `Next` on WorkSpaces configuration
Click `Next` on Customization - Optional
Scroll to the bottom and click `Create Workspaces`  

Wait for the state to change from `Pending` to `Available`  

# STAGE 6B - Workspaces Client

go to https://clients.amazonworkspaces.com  
Download and install the client for your operating system  
Once installed, it will ask for the `Registration Code` which is available from the options on the workspace in the AWS console, enter that.  
Then .. wait for the workspace to finish provisioning  
Login using `A4L\A4LAdmin` and the password you entered at the start when creating the stack.  
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

