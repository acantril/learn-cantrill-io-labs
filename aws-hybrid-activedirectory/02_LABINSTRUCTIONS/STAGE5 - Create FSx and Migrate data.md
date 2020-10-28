# Advanced Hybrid Directory Demo

First we will create the file system for aws.animals4life.org and then allow access from ad.animals4life.org users to migrate data  

# STAGE 5A - CREATE FSx File System  
Go here https://console.aws.amazon.com/fsx/home?region=us-east-1#file-systems  
Click `create File System`  
Select `Amazon FSx for Windows File Server`  
Click `next`  
File System name `A4LFiles`  
Select `MultiAZ`  
Select `SSD`  
Select `32GiB`  

Under `networking & Security`  
Select `AWS-VPC` in the Virtual Private Cloud (VPC) Dropdown  
For Security Groups Select `InstanceSG`  
For preferred Subnets  
Select `AWS-PRIVATE-A` and `AWS-PRIVATE-B`  
Under `Windows authentication` select `AWS Managed Microsoft Active Directory`  
Click the dropdown and select `aws.animals4life.org`  
Click `next`  
Click `create file system`  

Wait for the FSx File system to finish creating.  

# STAGE 5B - VERIFY IT WORKS FROM JUMPBOX-ONPREMISES 
Once FSx has completed provisioning and the file system is in an 'available' state  
Open the file system  
Copy down the `DNS Name` of the file system  
In the `JumpBox` (on-premises) window which should be connected to the `Client` machine  
open explorer  
enter `\\DNSNAME_OF_FSx`  
press enter  
Go into FSx Shared Folder  

Notice how this works natively since FSx is a windows native file server product   

# Stage 5C - Configure a DFS NameSpace and Folder

Click Windows Start button and type `DFS`  
Click to open `DFS Management`  
Click on `NameSpaces`  
Click `New Namespaces`  
Click `Browse`  
Type `DC1` and click `Check names` then click `OK`, then `NEXT`, then for the name type `private`  
Click Next  
Select `Domain Based namespace`  
Click `NEXT`  
Click `CREATE`  

That creates the DFS Namespace ... next we need to add folders to that namespace  

Select the namespace  
Right Click  
Select `New Folder` and call it `a4lfiles`  
Then click `Add` under folder targets  
type the address of the on-premises file share `\\fileserver\a4lfiles` then click `OK`   
then click `Add` again, this time adding the FSx File share, `\\DNS_OF_FSx\share`   
Click `OK`

At this point you have a namespace configured, click `OK` to create and then answer NO to replication.  
This namespace will now point at both file servers, you will be directed at the closest one.  

Open explorer  
in the bar  
enter `\\ad.animals4life.org\private` this shows the namespace ... and in there a folder a4lfiles  
this will be redirected at the closest file server  
  
# STAGE 5 - FINISH
Once you have connected ... you can finish this part of the DEMO  

