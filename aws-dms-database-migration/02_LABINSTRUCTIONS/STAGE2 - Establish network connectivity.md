# Advanced Demo - Migrating a database with the Database MIgration Service

In this advanced demo you will be migrating a simple web application (wordpress) from an on-premises environment into AWS.  
The on-premises environment is a virtual web server (simulated using EC2) and a self-managed mariaDB database server (also simulated via EC2)  
You will be migrating this into AWS and running the architecture on an EC2 webserver and RDS managed SQL database.  

Architecture Link : INSERT THE LINK HERE

This advanced demo consists of 5 stages :-

- STAGE 1 : Provision the environment and review tasks 
- STAGE 2 : Establish Private Connectivity Between the environments (VPC Peer) **<= THIS STAGE**
- STAGE 3 : Create & Configure the AWS Side infrastructure (App and DB)
- STAGE 4 : Migrate Database & Cutover
- STAGE 5 : Cleanup the account

![StageArchitecture](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE2.png)

# STAGE 2A - Create a VPC peer between On-Premises and AWS

Move to the VPC Console https://console.aws.amazon.com/vpc/home?region=us-east-1#  
Click on `Peering Connections` under `Virtual Private Cloud`  
Click `Create Peering Connection`  
for `Peering connection name tag` choose `A4L-ON-PREMISES-TO-AWS`  
for `VPC (Requester)` choose `onpremVPC`  
for `VPC (Accepter)` choose `awsVPC`  
Scroll down and click `Create Peering Connection`  
...then click `Actions` and then `Accept Request`  
Click `Accept Request`  
 

# STAGE 2B - Create Routes on the On-premises side
Move to the route tabes console https://console.aws.amazon.com/vpc/home?region=us-east-1#RouteTables:sort=routeTableId  
Locate the `onpremPublicRT` route table and select it using the checkbox.  
Click on the `Routes` Tab.  
You're going to add a route pointing at the AWS side networking, using the VPC Peer.  
Click `Edit Routes`  
Click `Add Route`  
For Destination enter `10.16.0.0/16`  
Click the `Target` dropdown & click `Peering Connection` and select the `A4L-ON-PREMISES-TO-AWS` then click `Save Changes`  
The Onpremises network can now route to the AWS Network, but as data transfer requires bi-directional traffic flow, you need to do the same at the other side.


# STAGE 2C - Create Routes on the AWS side
Move to the route tabes console https://console.aws.amazon.com/vpc/home?region=us-east-1#RouteTables:sort=routeTableId  
Locate the `awsPublicRT` route table and select it using the checkbox.  
Click on the `Routes` Tab.  
You're going to add a route pointing at the AWS side networking, using the VPC Peer.  
Click `Edit Routes`  
Click `Add Route`  
For Destination enter `192.168.10.0/24`  
Click the `Target` dropdown & click `Peering Connection` and select the `A4L-ON-PREMISES-TO-AWS` then click `Save Changes`  

Move to the route tabes console https://console.aws.amazon.com/vpc/home?region=us-east-1#RouteTables:sort=routeTableId  
Locate the `awsPrivateRT` route table and select it using the checkbox.  
Click on the `Routes` Tab.  
You're going to add a route pointing at the AWS side networking, using the VPC Peer.  
Click `Edit Routes`  
Click `Add Route`  
For Destination enter `192.168.10.0/24`  
Click the `Target` dropdown & click `Peering Connection` and select the `A4L-ON-PREMISES-TO-AWS` then click `Save Changes`  


# STAGE 2 - FINISH   

At this point you have created the peering connection between the VPCs and the gateway objects within each VPC.  
you have also configured routing from ONPremises -> AWS and vice-versa.  
In stage 3 you will use this architecture to begin a migration.  


