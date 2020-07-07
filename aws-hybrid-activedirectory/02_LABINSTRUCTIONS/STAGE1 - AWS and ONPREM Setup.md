# Advanced Hybrid Directory Demo

In this part of the demo you will be provisioning the Hybrid environment you will be using for the remainder of the activity.  
The CloudFormation template below is a NESTED STACK  
It created 4 nested stacks  

- ONPREM-VPC - the simulated On-premises environment.  
- AWS-VPC - the AWS Environment (including a VPC Peer between AWS and On-Premises - to simulate a VPN/DX)  
- ONPREM-AD - Creates the Self-Managed On-Premises Active Directory  
- ONPREM-COMPUTE - Creates the On-Premises Jumpbox, Client, FileServer which are joined to the On-Premises Domain  

Provisioning will take around 60 minutes +/- 20 minutes  

Once provisioned the full Demo steps will take another 60-12 minutes.  

# STAGE 1A - Login to an AWS Account  

Login to an AWS account and select the `N. Virginia // us-east-1 region`  

# STAGE 1B - Create an EC2 Key Pair  

Go here https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#KeyPairs:  
Click `Create Key Pair`  
Enter a Name ... i suggest A4L (Animals4life - the case study scenario)  
Choose `pem` for the File Format & Click `Create key pair`  
This will download the file locally .. keep this safe you will need it later  

# STAGE 1C - APPLY CloudFormation (CFN) Nested Stack  

Click https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-hybrid-activedirectory/01_HYBRIDDIR.yaml&stackName=HYBRIDDIR to apply the HybridDirectory Stack  

You will need to pick a `Domain Admin Password` to use for the on-premises directory and a `KeyPair` to use  

I would suggest leaving all other values as defaults at this stage  
  
# STAGE 1 - FINISH  

Let the NESTED Stack apply and then continue to STAGE 2 of the DEMO  

