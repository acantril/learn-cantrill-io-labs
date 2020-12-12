# Systems Manager - Advanced Demo 

Welcome to `STAGE2` of this Advanced Demo where you will gain practical experience using Systems Manager  
You will perform the following tasks:-   

- Provision the environments   
- Setup AWS Managed Instances  <== THIS STAGE  
- Setup On-Prem Managed instances  
- Configure Patching  
- Verify Patching  

To connect to Systems Manager instances need two things  
1) Connectivity to the systems manager endpoint (AWS Public Zone)  
2) Permisssions to interact with the endpoint.  

In this stage you will provide the AWS side instance permissions via an IAM role  
and diagnose any SSM issues which arise.  

# STAGE 2A - Attach Role and Verify Managed Instances  

Move to https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:  
Click `Instances`  
Click `Name` Column to sort by name  
Select AWS-CENTOS, `right click`, `Security`, Select `Modify IAM Role`  
Click dropdown and select role which contains `SSMInstanceProfile`  
Click `Save`  
Select AWS-WIN, `right click`, `Security`, Select `Modify IAM Role`   
Click dropdown and select role which contains `SSMInstanceProfile`  
Click `Save`   
Select AWS-UBUNTU, `right click`, `Security`, Select `Modify IAM Role`  
Click dropdown and select role which contains `SSMInstanceProfile`  
Click `Save`  

To ensure the Instance are able to connect to the SSM Agent, you are going to restart them  

Select AWS-CENTOS, `right click`, Select `Reboot isntance`
Click `Reboot`  
Select AWS-WIN, `right click`, Select `Reboot isntance`
Click `Reboot`  
Select AWS-UBUNTU, `right click`, Select `Reboot isntance`  
Click `Reboot`  

Now lets check systems manager  

move to https://console.aws.amazon.com/systems-manager/home?region=us-east-1  
Under `Instances & Nodes` click `Managed Instances`  
This will show any instances which have permissions to Systems manager & connectivity to systems manager  
Instances which have the agent and permissions register themselves to become `Managed Instances`  
You should see two instances `AWS-WIN` and `AWS-UBUNTU`  
Note you **DON'T** see `AWS-CENTOS`  

Many AMI's come with the agent installed ... ready to be used given connectivity and permissions  
The CENTOS AMI used ... is one which doesn't and thats the next thing to fix .... by installing the agent.  


# STAGE 2B - Manually install the Systems Manager Agent on the CENTOS AWS Instance


You're going to be connecting to the `AWS-CENTOS` instance, via the `AWS-JUMPBOX`  
AWS Publish a guide for various different operating systems here https://aws.amazon.com/blogs/security/securely-connect-to-linux-instances-running-in-a-private-amazon-vpc/  
You need an SSH Agent running on your local machine .... with your A4L SSH Key loaded  
This means when you connect to the jumpbox, and then to the CENTOS instance ... the agent running on your machine can be used for authentication  
It means you dont have to load the SSH key onto the jumpbox to use to connect to the AWS-CENTOS box  

- For windows - follow the instructions in the link above for Putty and Pageant 

- For macOS and linux verify that ssh-agent by running:   

``` eval `ssh-agent` ```  

- For macOS then run `ssh-add -K A4L.pem`  

- For Linux run `ssh-add A4L.pem`  

Open the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:  
Click `Running Instances`  
Right click on `AWS-Jumpbox` and click `Connect`  

In your terminal after completing the above steps  
run 

`chmod 400 A4L.pem` (if you are using macos or linux)  
ssh -A ec2-user@THEDNSNAMEOFTHE_AWS_JUMPBOX (this will look something like ec2-34-228-229-225.compute-1.amazonaws.com )  
Answer yes to any identity verification  
if you get an error here **be sure** you have used eval ssh-agent above AND added your ssh key  



This will connect you into the jumpbox ... the `-A` means that it allows the authentication to be used for the `AWS-CENTOS` instance too  

Quickly check the AWS console here https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceId  
Select the AWS-CENTOS instance  
Copy the instance private IP into your clipboard, it should be 10.16.X.Y  

From the jumpbox  

run `ssh centos@PRIVATEIP_OF_AWS-CENTOS`  
This will connect you into the `AWS-CENTOS` instance  

make sure python3 works  


for centos the command to install the Systems Manager Agent is   

`sudo dnf install -y https://s3.us-east-1.amazonaws.com/amazon-ssm-us-east-1/latest/linux_amd64/amazon-ssm-agent.rpm`  
then run  
`sudo systemctl enable amazon-ssm-agent`  
`sudo systemctl start amazon-ssm-agent`  

The last step is to check that the instance has registred itself in systems manager  

Move to the systems manager console  
https://console.aws.amazon.com/systems-manager/home?region=us-east-1  
Click `Managed Instances` under `Instances & Nodes`  
Verify that the `AWS-CENTOS` instance is now visible in the list of managed instances, you should have a total of 3 now.....  

# STAGE 2 - FINISH   

This is the end of STAGE2 of this advanced demo ...  
You now have all AWS Instances running as managed instances within Systems Manager  
In Stage 3 ... you will do the same, for the Servers running on-premises  
  






