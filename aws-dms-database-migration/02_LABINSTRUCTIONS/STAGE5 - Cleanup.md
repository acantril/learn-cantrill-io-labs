
# Advanced Demo - Migrating a database with the Database MIgration Service

In this advanced demo you will be migrating a simple web application (wordpress) from an on-premises environment into AWS.  
The on-premises environment is a virtual web server (simulated using EC2) and a self-managed mariaDB database server (also simulated via EC2)  
You will be migrating this into AWS and running the architecture on an EC2 webserver and RDS managed SQL database.  

Architecture Link : INSERT THE LINK HERE

This advanced demo consists of 6 stages :-

- STAGE 1 : Provision the environment and review tasks 
- STAGE 2 : Establish Private Connectivity Between the environments (VPC Peer) 
- STAGE 3 : Create & Configure the AWS Side infrastructure (App and DB) 
- STAGE 4 : Migrate Database & Cutover 
- STAGE 5 : Cleanup the account **<= THIS STAGE**

# STAGE 5A - EC2
Move to the EC2 Console https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:  
Select `awsCatWeb`, right click, instance state, terminate instance, terminate  

# STAGE 5B - RDS
Move to the RDS Console https://console.aws.amazon.com/rds/home?region=us-east-1#databases:  
Click `Databases`  
Select `a4lwordpress`  
Click `Actions` then `Delete`  
Uncheck `Create final snapshot?`  
Check the `I acknowledge...`, type `delete me` into the box and cick `Delete`  

**wait for this to delete**
Move to https://console.aws.amazon.com/rds/home?region=us-east-1#db-subnet-groups-list:  
Select the `a4ldbsngroup` click `Delete` then `Delete` again

# STAGE 5C- DMS
go to DMS console https://console.aws.amazon.com/dms/v2/home?region=us-east-1#tasks  
Select the `a4lonpremtoawswordpress` task, click `Actions`, `Delete` and then `Delete` again.

Got to https://console.aws.amazon.com/dms/v2/home?region=us-east-1#replicationInstances  
Delect the `a4lonpremtoaws` replication instance,  click `Actions`, `Delete` and then `Delete` again.

Move to https://console.aws.amazon.com/dms/v2/home?region=us-east-1#endpointList  
Select one of the endpoints, click `Actions`, `Delete` and then `Delete` again.
Select the other endpoint, click `Actions`, `Delete` and then `Delete` again.

**wait for the replication instance to finish deleting**
Move to https://console.aws.amazon.com/dms/v2/home?region=us-east-1#subnetGroup  
Select `a4ldmssngroup` click `Actions`, `Delete` and then `Delete` again.

# STAGE 5D - VPC PEER

Move to the VPC Console https://console.aws.amazon.com/vpc/home?region=us-east-1  
Click `Route Tables`  
Select `awsPrivateRT`  
Click `Routes`  
Click `Edit Routes`  
Click `X` next to the VPC Peer Route  
Click `Save Routes` and click `Close`  
Select `awsPublicRT`  
Click `Routes`  
Click `Edit Routes`  
Click `X` next to the VPC Peer Route  
Click `Save Routes` and click `Close`  
Select `onpremPublicRT`  
Click `Routes`  
Click `Edit Routes`  
Click `X` next to the VPC Peer Route  
Click `Save Routes` and click `Close`  

Move to VPC Peering Connections https://console.aws.amazon.com/vpc/home?region=us-east-1#PeeringConnections:sort=vpcPeeringConnectionId  
Select the `VPC Peer` you created earlier `A4L-ON-PREMISES-TO-AWS`, click `Actions`, `Delete VPC Peering Connection`, Click `Yes, Delete`  

# STAGE 5E - CLOUDFORMATION STACK

Move to the cloudformation console https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false   
Select the `DMS` stack  
Click `Delete` then `Delete Stack`  
