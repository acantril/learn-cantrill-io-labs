# Advanced Hybrid Directory Demo

In this part of the demo you will be creating the Managed Microsoft AD within AWS  
This uses the Directory Service and results in a `real` Microsoft AD delivered as a managed service  
The DS can be used to support AWS services which needed a directory such as FSx, Workspaces, Workdocs and so on.  

# STAGE 3A - Create the Directory (aws.animals4life.org)  

move to https://console.aws.amazon.com/directoryservicev2/home?region=us-east-1#!/directories  
Click `Setup A Directory`  
Directory Type `AWS Managed Microsoft AD`  
Click `Next`  

Populate the following values  

Edition : `Standard`  
Directory DNS Name `aws.animals4life.org`  
Netbios `A4LAWS`   
Admin password `REPLACE THIS WITH YOUR EXISTING DIRECTORY PASSWORD`  
(the admin use of the managed directory is `Admin`)  
Click `Next`  

Select the `AWS-VPC` VPC  
For subnets  
Top box = `AWS-PRIVATE-A`  
Bottom Box = `AWS-PRIVATE-B`  

Click `Next`  
Click `Create Directory`  

This will take some time to create 20-45 Minutes  

# STAGE 3B - CREATE A JUMP BOX IN AWS... DOMAIN JOINED so we can manage the AWS Directory.  

Move to https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
Launch Instance  
Name the instance `JumpBox-AWS`
Click `Windows` under the `Application and OS Images` section
Select `Microsoft Windows Server 2019 Base`
Select `t3.medium`
Choose `A4L` key pair
Under `Network settings` click `edit`
In `VPC` Dropdown set to `AWS-VPC`
In `Subnet` Dropdown set to `AWS-PUBLIC`
Click `Select Existing Security Group`
Remove all existing security groups
Check the SG with the description of `HYBRIDDIR-AWSVPC-*`
Expand the `Advanced Details` section
Under `Domain join directory` select `aws.animals4life.org`
Under `IAM Role` select `HYBRIDDIR-ONPREMVPC-*-EC2InstanceProfile-*`
Click `Review and Launch`
Click `Launch Instance`

# STAGE 3C - Connect to the Jump Box

Use the remote desktop application to connect to the Jumpbox-AWS  
You will need :-  
- server address (this might be called differently, its the `Public DNS` value above)  
- Username ... should be `admin@aws.animals4life.org`  
- Password ... the `Domain Admin Password` you chose for the directory service  

If there are any resolution settings `DONT` use fullscreen and set a resolution lower than your screen resolution (so you can see the instructions)  

# STAGE 3D - Install the Admin Tools  

Click `Start` and type powershell  
Right Click PowerShell and Run as Administrator  
Run `Install-WindowsFeature -IncludeAllSubFeature RSAT` to install domain mgmt tools  

Restart Jumpbox-AWS  

# STAGE 3E - Verify Domain Works  

Open the active directory users and computers and verify you can connect to the AWS based domain  

# Stage 3 - FINISH
Once you have connected ... you can finish this part of the DEMO
