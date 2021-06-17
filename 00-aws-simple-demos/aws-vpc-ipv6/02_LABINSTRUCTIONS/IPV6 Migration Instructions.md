# Demo - VPC IPv6 Migration - retrofitting IPv6 into an existing VPC

Welcome to this demo where you will gain the experience of adding IPv6 to an existing VPC
There are a number of key steps in the demo:-  

- (setup) Provision the IPv4 only environment using 1-Click Deployment
- (1a) Add an IPv6 CIDR to the VPC
- (1b) Allocate part of the above CIDR to Subnets within the VPC
- (2) Create an Egress-only internet gateway
- (3a) Update Route tables for public subnets to direct IPv6 traffic at the internet gateway
- (3b) Update Route tables for private subnets to direct IPv6 traffic at IGW or Egress-only internet gateway
- (4) Review and Update (as required) Security Groups and Network Access Control lists to ALLOW IPv6 traffic as needed.
- (5) Assign IPv6 addresses to ENIs within the VPC & configure subnets to allocate IPv6 automatically.
- (6) Configure DHCPv6 on all existing instances to obtain an IPv6 address within the OS
- (7) Cleanup

# SETUP 1 - Login to an AWS Account    
Login to an AWS account and select the `N. Virginia // us-east-1 region`    

# SETUP 2 - APPLY CloudFormation (CFN) Stack  
Applying the cloudformation template will create the DEMO VPC, 3 Public Subnets, an ASG and LT which will bootstrap some simple web servers and an application load balancer which runs in each AZ and has **NO STICKINESS*  

Click https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/awscoursedemos/0028-aws-specialty-vpc-ipv6migration/IPv6Migration.yaml&stackName=IPV6Migration  

Check the box for `capabilities: [AWS::IAM::Role]`
Click `Create Stack`

The stack will take 5-10 minutes to apply and will need to be in a `CREATE_COMPLETE` state before you can continue.  

# STAGE 1A - Add an IPv6 CIDR to the VPC

Move to the `VPC` console (https://console.aws.amazon.com/vpc/home?region=us-east-1#vpcs:)  
Select the `IPV6Migration-VPC` VPC from the list  
Click `Actions` and then `Edit CIDRs`  

You are going to be adding an Amazon Owned IPv6 CIDR range to this VPC
Click `Add new IPv6 CIDR`  
Ensure `Amazon-provided IPv6 CIDR block` is selected and that `us-east-1` is selected in the `Network border group` dropdown and click `Select CIDR`  

Check you have an allocated IPv6 CIDR and then click `Close`  


# STAGE 1B - Allocate part of the above CIDR to Subnets within the VPC

Move to the `Subnets` part of the VPC console (https://console.aws.amazon.com/vpc/home?region=us-east-1#subnets:)  
Drag the `Name` column width to the right so you can see the full names.  
Click `VPC` column to sort subnets by VPC  

For each of the subnets in the VPC ... you will be allocating a /64 IPv6 range which is a subset of the /56 range the VPC has. You will do this by using a 2 digit HEX value ... 00 => FF .. which allows 256 /64 networks in the /56 VPC.

For each of the subnets .... follow this process

Select the subnet using the check box.  
Click `Actions`=> `Edit IPv6 CIDRs`  
Click `Add IPv6 CIDR`, enter the value from the list below in the box and click `Save`
Repeat that process for ALL subets within the VPC.  

AZA

- IPV6Migration-SN-Reserved-A 00
- IPV6Migration-SN-DB-A 01
- IPV6Migration-SN-PRIV-A 02
- IPV6Migration-SN-PUB-A 03

AZB

- IPV6Migration-SN-Reserved-B 04
- IPV6Migration-SN-DB-B 05
- IPV6Migration-SN-PRIV-B 06
- IPV6Migration-SN-PUB-B 07

AZC

- IPV6Migration-SN-Reserved-C 08
- IPV6Migration-SN-DB-C 09
- IPV6Migration-SN-PRIV-C 0A
- IPV6Migration-SN-PUB-C 0B

# STAGE 2 - Create an Egress-only internet gateway

Select `Egress-Only Internet Gateways` from the menu on the left (https://console.aws.amazon.com/vpc/home?region=us-east-1#EgressOnlyInternetGateways:)  
Click `Create egress only internet gateway`  
Enter `a4l-eoigw` in the `Name` box, select `IPv6MIgration-VPC` in the `VPC` Dropdown and click `Create egress only internet gateway`  

# STAGE 3A - Update Route tables for public subnets to direct IPv6 traffic at the internet gateway

Click `Route Tables` in menu on left

For each of the "PUB" Route tables, do the following
Select the route table  
Click `Routes` Tab and then `Edit Routes`  
Click `Add Route` and enter ::/0 in the destination and select the internet gateway (NOT THE EGRESS ONLY) from the `Target` dropdown  
Click `Save Routes `


# STAGE 3B - Update Route tables for private subnets to direct IPv6 traffic at IGW or Egress-only internet gateway

FOR each of the DB, Reserved and Priv subnets do the following
Select the route table  
Click `Routes` Tab and then `Edit Routes`  
Click `Add Route` and enter ::/0 in the destination and select the Egress Only internet gateway from the `Target` dropdown  
Click `Save Routes `

# STAGE 4 - Review and Update (as required) Security Groups and Network Access Control lists to ALLOW IPv6 traffic as needed.

## NACL

Select `Network ACLs` from the menu on the left  (https://console.aws.amazon.com/vpc/home?region=us-east-1#acls:)  
Select `A4L-NACL-PUBLIC` by clicking the check box  
Click `Inbound Rules`  
Notice that it has a ALLOW ... rule 101 for 0.0.0.0/0 which is IPv4 catchall.  
CLick `End Inbound Rules`  
Click `Add new rule`  
`Rule NUmber` = 101, `Type` = `All Traffic`. `Source` = ::/0, `Allow/Deny` = Allow  
Click `Save Changes`  
Click `Outbound Rules`
Notice the same lack of ipv6 rules ....
Click `Edit Outbound Rules`  
`Rule NUmber` = 101, `Type` = `All Traffic`. `Destination` = ::/0, `Allow/Deny` = Allow

Select `Network ACLs` from the menu on the left  (https://console.aws.amazon.com/vpc/home?region=us-east-1#acls:)  
Select `A4L-NACL-PRIVATE` by clicking the check box  
Click `Inbound Rules`  
Notice that it has a ALLOW ... rule 101 for 0.0.0.0/0 which is IPv4 catchall.  
CLick `End Inbound Rules`  
Click `Add new rule`  
`Rule NUmber` = 101, `Type` = `All Traffic`. `Source` = ::/0, `Allow/Deny` = Allow  
Click `Save Changes`  
Click `Outbound Rules`
Notice the same lack of ipv6 rules ....
Click `Edit Outbound Rules`  
`Rule NUmber` = 101, `Type` = `All Traffic`. `Destination` = ::/0, `Allow/Deny` = Allow

## Security Groups

Click `Security Groups` on the menu on the left (https://console.aws.amazon.com/vpc/home?region=us-east-1#securityGroups:)  
Select the `Security Group` wich starts `IPV6Migration-GeneralSGIPv4-....`  
Click `Inbound Rules` ... notice no ipv6 rules.... allows for SSH and HTTP using IPv4....
CLick `Edit Inbound Rules`  
Click `Add rule` twice
Change one dropdown to `SSH` and the other to `HTTP`  
Add `::/0` into source for both rules  
Add `Allow SSH IPv6 IN` and `Allow HTTP IPv6 IN` for the rules 
Click `Save rules`  
Click `Outbound Rules`  
Notice there IS an allow ALL ipv6 outbound ... so we don't need to change this...


# STAGE 5A - configure subnets to allocate IPv6 automatically.

Click `Subnets` in the menu on the left
For ALL subnets in the VPC follow the process below.
Select the subnet using the checkbox, then click `Actions` => `Modify auto-assign IP settings`
Check the `Enable auto-assign IPv6 address` box to ensure anything launched into the subnet is given an IPv6 address and click `Save`

# STAGE 5B - Assign IPv6 addresses to ENIs within the VPC 

Open the `EC2` console (https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:)  
Click `Instances`  
For each instance .... right click, networking, `managed IP addresses`  
expand `eth0`  
Under `IPv6 addresses`, click `Assign new IP address`
Leave the `IPv6 address` blank to auto assign and click save  and `Confirm`  


# STAGE 6 - Configure DHCPv6 on all existing instances to obtain an IPv6 address within the OS

Select `A4L-IPv4PublicEC2`, right click, choose session manager and click `Connect`  
run an `ifcofnig`  
notice it has an `inet6` address (it will have multiple, but one matches the iIPv6 field in the EC2 console)
run `ping -6 www.google.com` ... notice that this is working using IPv6 ...
This instance is amazon linux 2 and has DHCP6 enabled by default - it uses DHCP and obtains an IPv6 address from the subnet range.
Close the session manager session.  
Connect to `A4L-IPv4PrivateEC2` using session manager.
run `ifconfig`  
notice it has an `inet6` address (it will have multiple, but one matches the iIPv6 field in the EC2 console)
run `ping -6 www.google.com` ... notice that this is working using IPv6 ...
This is using the egress only internet gateway ... this instance is not reachable from the public IPv6 internet.
Close the session manager session.  
Connect to `A4L-IPv4PrivateEC2Ubuntu` using session manager.  
run `sudo bash`
run `apt install ping` and answer `Y` if prompted.
notice no connectivity ? this is a private instance.....
run `ifconfig`
notice the inet6 **doesn't** match the IPv6 address in the ec2 console....
this is because this instance has no DHCP6 configured.

lets resolve that ....
run `cat /etc/network/interfaces.d/50-cloud-init.cfg`  
there is no IPv6 configuration here ... we need to add it.  
make a note of the network interface .. it should be `eth0`  
run `echo "iface eth0 inet6 dhcp" >> /etc/network/interfaces.d/60-default-with-ipv6.cfg`
run `sudo ifdown eth0 ; sudo ifup eth0`
run `ifconfig`
notice that it now has 2 inet6 ... one of which matches the IPv6 address allocated to the Ec2 instance
run `ping -6 www.google.com` ... notice that this is working using IPv6 ...


# STAGE 7 - CLEANUP

Move to egress only internet gateway (https://console.aws.amazon.com/vpc/home?region=us-east-1#EgressOnlyInternetGateways:)
Select `a4l-eoigw` then `Actions` and `delete egress only internet gateway`  
Type `delete` and click `Delete Egress only internet gateway` to confirm 
Move back to the CLoudFormation console (https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringStatus=active&filteringText=&viewNested=true&hideStacks=false) 
Select `IPV6MIgration` & click `Delete`  then `Delete Stack`  





