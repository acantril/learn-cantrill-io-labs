# Advanced Hybrid DNS Demo  

Welcome to `STAGE4` of this Advanced Demo where you will gain practical experience using a Hybrid ONPREMISES & AWS DNS Environment
You will perform the following tasks:-  

- Provision the environments  
- Verify no IP & DNS Connectivity    
- Configure a VPC Peer between the environments  
- Configure inbound R53 Endpoints allowing the on-premises environment to resolve AWS   
- Configure outbound R53 Endpoints allowing the AWS environment to resolve on-premises <== THIS STAGE  

# STAGE 4A - OUTBOUND ENDPOINTS

Load the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1  
Click `Running Instances`   
Select `A4L-ONPREM-DNSA` and note down its PrivateIP  
Select `A4L-ONPREM-DNSB` and note down its PrivateIP  



Move to the Route53 Console https://console.aws.amazon.com/route53/home?region=us-east-1#   
Click `Outbound endpoints`  under `Resolver`  
Click `Create Outbound Endpoint`  

Call it `A4LOUTBOUND`  
The outbound endpoints will be running from the AWS side... so ...
Select `a4l-aws` in the VPC Dropdown  
Select `AWSSecurityGroup` in the security group dropdown  

Endpoints for R53 consist of 2 ENI's which are allocted with 1 IP address each.  
Next you need to pick the subnets these will be placed in.  
Scroll Down and find `IP address #1`
Click `Availability Zone` dropdown and select `us-east-1a`  
Click the Subnet dropdown and pick `sn-private-A`  
Leave the IP assignment as `Use an IP address that is selected automatically`  

Scroll Down and find `IP address #2`
Click `Availability Zone` dropdown and select `us-east-1a`  
Click the Subnet dropdown and pick `sn-private-A`  
Leave the IP assignment as `Use an IP address that is selected automatically`  

Scroll down to the bottom  
Click `Submit`  

Click `Outbound Endpoints` under Resolver  
Wait for the endpoint to move to `Operational`  

Once its operational... you need to create a forwarding rule, which will configure for which domains the outbound endpoints will use the on-premises DNS servers.  
Click `Rules` under Resolver  
Click `Create Rule`    
Call the rule `A4LONPREM-CORPZONE`  
Type `Forward`  
Domain name `corp.animals4life.org` the on-premises DNS zone  
For VPC .. pick `a4l-aws` because these endpoints are in the AWS side of the infrastructure  
For `Outbound Endpoint` pick the endpoint the rule will apply too `A4LOUTBOUND`  

Scroll down, and now you need to point at the DNS IP addresses which will be used by this rule.. the on-premises DNS servers.  
Click `Add Target` so you have two IP address boxes  
In box one, enter the privateIP of `A4L-ONPREM-DNSA`  
In box two, enter the privateIP of `A4L-ONPREM-DNSB`  
Scroll down an click `Submit`  

# STAGE 4B - TEST and VERIFY

Move to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1  
Click `Running Instances`  
Select `A4L-AWS-EC2-A` right click and `connect`, select `session manager` click `connect`  

type `ping app.corp.animals4life.org`   
You should now get a successful response ...

# STAGE 4C - LESSON CLEANUP

In the R53 Console  
Select rules  
Select the `A4LONPREM-CORPZONE` rule you created earlier, enter the rule  
Scroll down, select the VPC its associated with and click `Disassociate` 
Confirm by typing `disassociate` and click `Submit`  

Wait for that disassociation to complete  
Click `Delete` to delete the rule and confirm  

Select `Outbound Endpoints` under `Resolver`  
Select the `A4LOUTBOUND` endpoint and click `Delete`  
Confirm the deletion and click `Submit`  

Select `Inbound Endpoints` under `Resolver`  
Select the `A4LINBOUND` endpoint and click `Delete`  
Confirm the deletion and click `Submit`  

Move to the `VPC` console and then `Peering Connections` https://console.aws.amazon.com/vpc/home?region=us-east-1#PeeringConnections:sort=vpcPeeringConnectionId  
Delete the peering connection you created earlier `AWS-ONPREM`  
Confirm with `YES, Delete`  

Move to the CloudFormation Console https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false  
Select the `HYBRIDDNS` Stack and Click `DELETE`  
Confirm by clicking `Delete Stack`  

# STAGE 4 - FINISH

Congratulations you have finished !!! your account is back into the same state as it was at the start of this DEMO.  
Please check out my courses at https://learn.cantrill.io for more in-depth AWS content and Advanced Demo lessons.  





