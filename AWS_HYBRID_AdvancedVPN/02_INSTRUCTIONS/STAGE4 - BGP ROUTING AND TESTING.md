# Advanced Highly-Available Dynamic Site-to-Site VPN

# STAGE 4A - CONFIGURE BGP ROUTING FOR ONPREMISES-ROUTER1 AND TEST

Move to EC2 Console
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState
Click `Instances` on the left menu
Locate and select `ONPREM-ROUTER1`
Right Click => `Connect`
Select `Session Manager`
Click `Connect`

`chmod +x ffrouting-install.sh`
`./ffrouting-install.sh`

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

SHOW THE ROUTES VIA THE UI
SHOW THE ROUTES VIA `vtysh`

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




# STAGE 4B - CONFIGURE BGP ROUTING FOR ONPREMISES-ROUTER2 AND TEST

Move to EC2 Console
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState
Click `Instances` on the left menu
Locate and select `ONPREM-ROUTER2`
Right Click => `Connect`
Select `Session Manager`
Click `Connect`

`chmod +x ffrouting-install.sh`
`./ffrouting-install.sh`

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

SHOW THE ROUTES VIA THE UI
SHOW THE ROUTES VIA `vtysh`

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


