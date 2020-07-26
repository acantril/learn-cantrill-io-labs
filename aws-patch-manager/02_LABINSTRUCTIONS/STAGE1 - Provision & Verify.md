# Systems Manager - Advanced Demo 

Welcome to `STAGE1` of this Advanced Demo where you will gain practical experience using Systems Manager
You will perform the following tasks:-  

- Provision the environments  <== THIS STAGE  
- Setup AWS Managed Instances
- Setup On-Prem Managed instances
- Configure Patching
- Verify Patching

By the end of this stage you will have the AWS and Simulated On-premises environment running, including

A Windows, Centos and Ubuntu instance/server running in both
A Jumpbox running in both.

# STAGE 1A - Login to an AWS Account    
Login to an AWS account and select the `N. Virginia // us-east-1 region`    

# STAGE 1B - APPLY CloudFormation (CFN) Stack  

Before applying the stack below, make sure you have a SSH Keypair created and you have the .pem part downloaded to your local machine
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#KeyPairs:

If you **DON'T** then you need to create one called `A4L` (Animals4life - the case study used in these demos)

Click `Create Key pair`
under Name enter `A4L`
For file format select `pem` (if you use windows and putty you can pick `ppk`, if you run windows and any WSL2 or other terminal apps which use standard eys pick `pem`)
Click `Create Key Pair`
it will download the `.pem` file to your local machine, keep this safe and in the same folder as you run any commands later.

Click https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-patch-manager/PatchManagerBase.yaml&stackName=SSMBASE  

if you see any checkboxes as below , if not... ok :)
Check the box for `capabilities: [AWS::IAM::Role]`
Click `Create Stack`

Wait for the stack to move into a `CREATE_COMPLETE` status

# STAGE 1C - Use CloudFormation to create the Systems Manager Endpoints & Systems Manager Role

Make sure you are still in `N. Virginia // us-east-1 region`
Click https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-patch-manager/PatchManagerVPCEndpointsandRole.yaml&stackName=SSMVPCE
Check the box for `capabilities: [AWS::IAM::Role]`
Click `Create Stack`
Wait for the `SSMVPCE` template to move into a `CREATE_COMPLETE` status 

# STAGE 1 - FINISH 

At this stage you have the `AWS` and Simulated `On-Premises` environment created.

