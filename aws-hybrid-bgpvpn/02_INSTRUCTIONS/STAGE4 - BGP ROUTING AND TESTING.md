# Advanced Highly-Available Dynamic Site-to-Site VPN

In this stage you will use the IPSEC tunnels created in stage 3 .. adding BGP sessions over all the tunnels.  
These sessions will allow the ONPREM Routers to exchange routers with the Transit Gateway running in AWS  
Once routes are exchanged, the connections will allow data to flow between AWS and ONPREMISES  
BGP capability is added using `FRR` and that will be installed as part of this stage of the demo.  

# STAGE 4A - INSTALL FRR ON ROUTER 1 (BGP CAPABILITY)

Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `ONPREM-ROUTER1`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

First we will make the `FRR` script executable and run it to install BGP capability.  
`sudo bash`  
`cd /home/ubuntu/demo_assets`   
`chmod +x ffrouting-install.sh`   
`./ffrouting-install.sh`  
** This will take some time - 10-15 minutes **  
** We can allow this to run, and start the same process on the other Router **  

# STAGE 4B - INSTALL FRR ON ROUTER 2 (BGP CAPABILITY)

Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `ONPREM-ROUTER2`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

`sudo bash`  
`cd /home/ubuntu/demo_assets`  
`chmod +x ffrouting-install.sh`     
`./ffrouting-install.sh`  

# STAGE 4C - CONFIGURE BGP ROUTING FOR ONPREMISES-ROUTER1 AND TEST

`vtysh`  
`conf t`  
`frr defaults traditional`  
`router bgp 65016`  
`neighbor CONN1_TUNNEL1_AWS_BGP_IP remote-as 64512`  
`neighbor CONN1_TUNNEL2_AWS_BGP_IP remote-as 64512`  
`no bgp ebgp-requires-policy`  
`address-family ipv4 unicast`  
`redistribute connected`  
`exit-address-family`  
`exit`  
`exit`  
`wr`  
`exit`  

`sudo reboot`  

`ONPREM-ROUTER1` once back will now be functioning as both an IPSEC endpoint and a BGP endpoint. It will be exchanging routes with the transit gateway in AWS.  

Locate and select `ONPREM-ROUTER1`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  
`sudo bash`  

SHOW THE ROUTES VIA THE UI `route`   
SHOW THE ROUTES VIA `vtysh`  
`show ip route`. 

Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `ONPREM-SERVER1`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

run `ping IP_ADDRESS_OF_EC2-A`  

Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `EC2-A`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

run `ping IP_ADDRESS_OF_ONPREM-SERVER1`  


# STAGE 4D - CONFIGURE BGP ROUTING FOR ONPREMISES-ROUTER2 AND TEST

`vtysh`  
`conf t`  
`frr defaults traditional`  
`router bgp 65016`  
`neighbor CONN2_TUNNEL1_AWS_BGP_IP remote-as 64512`  
`neighbor CONN2_TUNNEL2_AWS_BGP_IP remote-as 64512`  
`no bgp ebgp-requires-policy`  
`address-family ipv4 unicast`  
`redistribute connected`  
`exit-address-family`  
`exit`  
`exit`  
`wr`  
`exit`  

`sudo reboot`  

`ONPREM-ROUTER2` once back will now be functioning as both an IPSEC endpoint and a BGP endpoint. It will be exchanging routes with the transit gateway in AWS.  


Locate and select `ONPREM-ROUTER2`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  
`sudo bash`  
   
SHOW THE ROUTES VIA THE UI  `route`  
SHOW THE ROUTES VIA `vtysh`  
`show ip route`  


Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `ONPREM-SERVER2`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

run `ping IP_ADDRESS_OF_EC2-B`  

Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `EC2-B`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

run `ping IP_ADDRESS_OF_ONPREM-SERVER2`  


