# Advanced Highly-Available Dynamic Site-to-Site VPN

In this part of the DEMO, you will be creating a few things:-

- The initial AWS environment with 2 subnets, 2 EC2 instances, a TGW and VPC attachment and a default route pointing at the TGW
- The simulated on-premises environment - 1 public subnet, 2 private subnets. The public subnet has 2 Ubuntu + strongSwan + Free VPN endpoints.

# STAGE 1A - INITIAL SETUP OF AWS ENVIRONMENT AND SIMULATED ON-PREMISES ENVIRONMENT

First lets create the initial environments.

Open https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/

- Use the 1-click Deployment link from the previous page to create the demo infrastructure - If prompted ... check capabilities Box

Wait for the stack to move into a `CREATE_COMPLETE` status **Estimated time to complete 5-10 mins**

# STAGE 1B - CREATE CUSTOMER GATEWAY OBJECTS 

Open a new tab to the VPC Console (https://console.aws.amazon.com/vpc/home?region=us-east-1#)  
Open a new tab to CloudFormation Console (https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/)  
In the cloudFormation Tab  
Click `ONPREM` stack  
Click Outputs  
Note down IP for `Router1Public` and `Router2Public`  

In the VPC Console https://console.aws.amazon.com/vpc/home?region=us-east-1#  
Select `Customer Gateways` under `Virtual private Network (VPN)`  
Click `Create Customer gateway`  
Set Name to `ONPREM-ROUTER1`  
Click `Dynamic` for routing  
Set BGP ASN to `65016`  
Set IP Address to Router1PubIP  
Click `create Customer gateway`  

In the VPC Console https://console.aws.amazon.com/vpc/home?region=us-east-1#  
Select `Customer Gateways` under `Virtual private Network (VPN)`  
Click `Create Customer gateway`  
Set Name to `ONPREM-ROUTER2`  
Click `Dynamic` for routing  
Set BGP ASN to `65016`  
Set IP Address to Router2PubIP  
Click `create Customer gateway`  

# CONFIRM NO CONNECTIVITY

Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `ONPREM-SERVER2`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

run `ping IP_ADDRESS_OF_EC2-B`  
It doesn't work ... because there's no connectivity.


# FINISH

Once those CGW's have finished creating thats the end of STAGE one of the DEMO
