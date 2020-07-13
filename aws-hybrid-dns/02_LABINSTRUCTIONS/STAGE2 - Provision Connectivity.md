# Advanced Hybrid DNS Demo  

Welcome to `STAGE2` of this Advanced Demo where you will gain practical experience using a Hybrid ONPREMISES & AWS DNS Environment
You will perform the following tasks:-  

- Provision the environments  
- Verify no IP & DNS Connectivity 
- Configure a VPC Peer between the environments   <== THIS STAGE  
- Configure inbound R53 Endpoints allowing the on-premises environment to resolve AWS  
- Configure outbound R53 Endpoints allowing the AWS environment to resolve on-premises 

# STAGE 2A - CREATE A VPC PEER


Move to the `VPC` console and then `Peering Connections` https://console.aws.amazon.com/vpc/home?region=us-east-1#PeeringConnections:sort=vpcPeeringConnectionId  
Click `Create Peering Connection` 
For `Peering Connection name Tag` enter `AWS-ONPREM`  
Click `VPC (Requester)` dropdown and select `a4l-aws`  
Scroll down
Click `VPC (Accepter)` select `a4l-onprem`  
Click `Create Peering Connection`  

This creates the peering connection & logical gateway object between the two VPCs
Click `OK`

# STAGE 2B - ACCEPT THE VPC PEER

Now you need to accept the VPC Peering connection - creating a VPC peer is an `INVITE` and `ACCEPT` architecture  
Select the `PEERING CONNECTION` which shows as `Pending Acceptance`  
Click the `Actions` Dropdown and select `Accept Request`  
Click `Yes, Accept`  
Click `Close`  

Thats the peering connection created between the `AWS` and `Simulated ON-PREMISES` VPC  

# STAGE 2B - ADD ROUTING - AWS

Move to the `Route Tables` area of the `VPC` Console https://console.aws.amazon.com/vpc/home?region=us-east-1#RouteTables:sort=tag:Name  
Select the `A4L-AWS-RT` , click `Routes` Tab
Click `Edit Routes`
Click `Add Route` 
You're adding a route for the `simulated on-premises` environment  
Type `192.168.10.0/24` into the destination (on-premises CIDR)
Click the `Target` Dropdown, Select `Peering Connection` and select `AWS-ONPREM`  
Click `Save Routes`  
Click `Close`  

Thats the route FROM `AWS` TO `ON-PREMISES`  


# STAGE 2C - ADD ROUTING - ONPREM

Move to the `Route Tables` area of the `VPC` Console https://console.aws.amazon.com/vpc/home?region=us-east-1#RouteTables:sort=tag:Name  
Select the `A4L-ONPREM-RT` , click `Routes` Tab  
Click `Edit Routes`  
Click `Add Route` 
You're adding a route for the `AWS` environment  
Type `10.16.0.0/16` into the destination (AWS VPC CIDR)  
Click the `Target` Dropdown, Select `Peering Connection` and select `AWS-ONPREM`  
Click `Save Routes`    
Click `Close`  

# STAGE 2D - TEST

Move to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1  
Click `Running Instances`
You will need the IP address of one side of the peering relationship  
Select `A4L-ONPREM-APP` copy down the `Private IP` for this instance  
Select the `A4L-AWS-EC2-A`, right click, Click `connect`, choose `Session Manager` , Click `Connect`  
Type `ping IPYOUJUSTCOPIED`  
This verifies that the `AWS` environment can ping a resource in the `on-premises` environment  
But ... DNS still doesn't work....
If you type `ping app.corp.animals4life.org` you should recieve the message `ping: app.corp.animals4life.org: Name or Service not known`
This is expected ... there is no DNS integration ... yet!  

# STAGE 2 - FINISH 

This is the end of STAGE2 of this advanced demo ...
You have created a VPC Peering connection between `AWS` and `ON-PREMISES` which provides IP connectivity between the two environments





