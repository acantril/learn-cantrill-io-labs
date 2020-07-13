# Advanced Hybrid DNS Demo  

Welcome to `STAGE1` of this Advanced Demo where you will gain practical experience using a Hybrid ONPREMISES & AWS DNS Environment
You will perform the following tasks:-  

- Provision the environments  <== THIS STAGE  
- Verify no IP & DNS Connectivity  <== THIS STAGE  
- Configure a VPC Peer between the environments  
- Configure inbound R53 Endpoints allowing the on-premises environment to resolve AWS  
- Configure outbound R53 Endpoints allowing the AWS environment to resolve on-premises  

# STAGE 1A - Login to an AWS Account    
Login to an AWS account and select the `N. Virginia // us-east-1 region`    

# STAGE 1B - APPLY CloudFormation (CFN) Stack  

Click https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-hybrid-dns/HybridDNS.yaml&stackName=HYBRIDDNS  

Check the box for `capabilities: [AWS::IAM::Role]`
Click `Create Stack`

The stack will take 5-10 minutes to apply and will need to be in a `CREATE_COMPLETE` state before you can continue.  

# STAGE 1C - VERIFY THERE IS NO CONNECTIVITY BETWEEN ENVIRONMENTS  

Move to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1  
Click `Running Instances`  
Select `A4L-AWS-EC2-A` right click and `connect`, select `session manager` click `connect`  

type `ping app.corp.animals4life.org`  
Verify that you get a message `ping: app.corp.animals4life.org: Name or Service not known`  
This proves that the `AWS` environment cannot resolve any DNS from the `on-premises (corp)` environment  
Move back to the EC2 Console  
Select `A4L-ONPREM-APP` and copy its `Private IP` into your clipboard  
Move back to the session manager connection to `A4L-AWS-EC2-A`  
Type `ping THEIPADDRESSYOUJUSTCOPIED`  
Verify you DON'T Receive a ping response ... proving that there is no networking connectivity between the `AWS` and `ON-PREMISES` Environments  
Close down the session manager tab to `A4L-AWS-EC2-A`  
Select `A4L-ONPREM-APP` right click, select `connect`, choose `session manager`, click `connect` 
Type `ping web.aws.animals4life.org`  
Verify you get the error `ping: web.aws.animals4life.org: Name or Service not known`  
This proves that there is no resolution from the `on-premises` environment to `AWS`  
Move back to the EC2 Console  
Select `A4L-AWS-EC2-A` and copy its `Private IP` into your clipboard  
Move back to the session manager connection to `A4L-ONPREM-APP`  
Type `ping THEIPADDRESSYOUJUSTCOPIED`  
Verify you DON'T Receive a ping response ... proving that there is no networking connectivity between the `ON-PREMISES` and `AWS` Environments  

# STAGE 1 - FINISH 

This is the end of STAGE1 of this advanced demo ...
You have created the `AWS` and `ON-PREMISES` environment and verified that no DNS or IP connectivity exist between the two environments  