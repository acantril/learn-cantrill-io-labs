# Systems Manager - Advanced Demo 

Welcome to `STAGE3` of this Advanced Demo where you will gain practical experience using Systems Manager  
You will perform the following tasks:-    

- Provision the environments    
- Setup AWS Managed Instances  
- Setup On-Prem Managed instances <== THIS STAGE   
- Configure Patching  
- Verify Patching  

# STAGE 3A - Connect to the Onprem JUMPBOX  

Move to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:  
Click `Instances`  
Select `A4L-Jumpbox`  
Note down its public DNS name   
Select the `A4L-WIN` instance   
... and note down its private IP address  


make sure you have completed the SSH-Agent or Pageant components from the previous stage  
run   

for macOS and Linux run  

`ssh -A -L 127.0.0.1:1234:A4LWINIP:3389 ec2-user@A4L-JUMPBOXDNS`   

for windows ... follow the instructions in https://aws.amazon.com/blogs/security/securely-connect-to-linux-instances-running-in-a-private-amazon-vpc/ to connect to a bastion
and use the instructions here https://blog.devolutions.net/2017/4/how-to-configure-an-ssh-tunnel-on-putty to configure the same port forward as above  


# STAGE 3B - Create a Managed Instances Activation  

Move to the systems manager console https://console.aws.amazon.com/systems-manager/home?region=us-east-1  
Click `Hybrid Activations` under `Instances & Nodes`  
Click `Create an Activation`  
For description enter `A4L-ONPREM`  
for `instance limit` enter `10`  

Under IAM role this is where the permissions are defined which the instances essentially `get`  
instead of AWS where EC2 assumes a role and uses that to communicate with Systems Manager  
With Hybrid activations - the activation gives the server the right to use this role which you specify here  

Leave as the default of `Create a system default command execution role that has the required permissions`  

You could optionally create an `Activation Expiry Date`, but for now... just click `Create Activation`  
  
Note down the `Activation Code` and `Activation ID`   
# Stage 3D - Install the agent on the A4L-CENTOS server  
Move to https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:  
Click `Instances`  
Select `A4L-CENTOS`  
Note down the `Private IP`  


From the A4L-JUMPBOX  
run  
`ssh centos@PRIVATE_IP_OF_A4L-CENTOS`  

``` 
mkdir /tmp/ssm
curl https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm -o /tmp/ssm/amazon-ssm-agent.rpm
sudo dnf install -y /tmp/ssm/amazon-ssm-agent.rpm
sudo systemctl stop amazon-ssm-agent
sudo amazon-ssm-agent -register -code "activation-code" -id "activation-id" -region "us-east-1"
sudo systemctl start amazon-ssm-agent

```

if you see any of these errors its fine  
Error occurred fetching the seelog config file path:  open /etc/amazon/ssm/seelog.xml: no such file or directory  
Initializing new seelog logger  
New Seelog Logger Creation Complete  
2020-07-25 23:35:19 ERROR error while loading server info%!(EXTRA *errors.errorString=Failed to load instance info from vault. RegistrationKey does not exist.)  


# Stage 3E - Install the agent on the A4L-UBUNTU server  

Move to https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:  
Click `Instances`  
Select `A4L-UBUNTU`  
Note down the `Private IP`  

From the A4L-JUMPBOX  
run  
`ssh ubuntu@PRIVATE_IP_OF_A4L-UBUNTU`  

```
mkdir /tmp/ssm
curl https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/debian_amd64/amazon-ssm-agent.deb -o /tmp/ssm/amazon-ssm-agent.deb
sudo dpkg -i /tmp/ssm/amazon-ssm-agent.deb
sudo service amazon-ssm-agent stop
sudo amazon-ssm-agent -register -code "activation-code" -id "activation-id" -region "us-east-1" 
sudo service amazon-ssm-agent start

```

These errors are fine  

Error occurred fetching the seelog config file path:  open /etc/amazon/ssm/seelog.xml: no such file or directory  
Initializing new seelog logger  
New Seelog Logger Creation Complete  
2020-07-25 23:40:33 ERROR error while loading server info%!(EXTRA *errors.errorString=Failed to load instance info from vault. RegistrationKey does not exist.)  

# Stage 3F - Install the agent on the A4L-UBUNTU server  

** this is a pretty complex part ... it does work but ONLY if you have done all the steps above **  
if any of this fails ... join https://techstudyslack.com and message `Adrian`  
  
Open the EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=tag:Name  
Click `Instances`  
select `A4L-WIN` right click, click `Connect`  
Click `Get Password`  
Click `Choose File`  
Find and Select `A4L`  
Click `Decrypt Password`  

Note down the `User name` and `Password`  
You wont be using the instance IP ... because you will be connecting via the jumpbox using a port forward via SSH  
open your remote desktop client  
  for windows `mstsc`  
  for macOS istall microsoft remote desktop client from the app store  
  Linux ... find a remote desktop client  

With whatever client you choose  
Connect to  
`127.0.0.1` on port `1234`  

This is connecting via a forwarded port on your local machine `1234` through the jumpbox, and is being forwarded to the A4L-WIN server  

Login using the `Username` and `Password` you noted down above  
**THIS MIGHT BE SLOW, ITS A t2.micro .... to keep it free **  
Answer `Yes` to any network prompts  

open https://learn-cantrill-labs.s3.amazonaws.com/aws-patch-manager/uninstall.ps1  
select all, copy  
This is used to cleanup any previously installed or configured agent (if it exists)  


Click the Search icon on the bar at the bottom  
Type `PowerShell`  
locate , under apps, `Windows Powershell` right click, select `Run as Administrator`  
paste in the contents you copied above  

if powershell closes  
    Click the Search icon on the bar at the bottom  
    Type `PowerShell`  
    locate , under apps, `Windows Powershell` right click, select `Run as Administrator`  

Run the code below, line by line, replacing activation-code , actiovation-id with the values you noted down ealier  

```
$code = "activation-code"
$id = "activation-id"
$region = "us-east-1"
$dir = $env:TEMP + "\ssm"
New-Item -ItemType directory -Path $dir -Force
cd $dir
(New-Object System.Net.WebClient).DownloadFile("https://amazon-ssm-$region.s3.amazonaws.com/latest/windows_amd64/AmazonSSMAgentSetup.exe", $dir + "\AmazonSSMAgentSetup.exe")
Start-Process .\AmazonSSMAgentSetup.exe -ArgumentList @("/q", "/log", "install.log", "CODE=$code", "ID=$id", "REGION=$region") -Wait
Get-Content ($env:ProgramData + "\Amazon\SSM\InstanceData\registration")
Get-Service -Name "AmazonSSMAgent"
```


# Stage 3G - Verify they appear in Systems Manager  

Move to https://console.aws.amazon.com/systems-manager/managed-instances?region=us-east-1  
Verify you see all A4L and AWS Instances except the jumpboxes  


# STAGE 3 - FINISH  

At this poine you have a collection of managed instances - both AWS instances and Simulated On-Premises servers  
In the next stage you will configure patching for all the managed instances  


