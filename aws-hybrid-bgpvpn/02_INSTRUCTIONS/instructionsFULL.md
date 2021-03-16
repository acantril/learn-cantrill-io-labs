# Advanced Highly-Available Dynamic Site-to-Site VPN

# STAGE 1A - INITIAL SETUP OF AWS ENVIRONMENT AND SIMULATED ON-PREMISES ENVIRONMENT

- Apply `ADVS2SVPN-AWS.yaml` to the `us-east-1` region in your AWS account (Call it AWS) - If prompted ... check capabilities Box
- Apply `ADVS2SVPN-ONPREM.yaml` to the `us-east-1` region in your AWS account (Call it OMPREM) - If prompted ... check capabilities Box

Wait for both stacks to move into a `CREATE_COMPLETE` status **Estimated time to complete 5-10 mins**

# STAGE 1B - CREATE CUSTOMER GATEWAY OBJECTS 

Open a new tab to the VPC Console
Open a new tab to CloudFormation Console
In the cloudFormation Tab
Click ON-PREM stack
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

# STAGE 2A - CREATE VPN ATTACHMENTS FOR TRANSIT GATEWAY

Move back to `Transit Gateway Attachments` https://console.aws.amazon.com/vpc/home?region=us-east-1#TransitGatewayAttachments:sort=transitGatewayAttachmentId

Click `Create Transit Gateway Attachment`
Click `Transit Gateway ID` dropdown and select `A4LTGW`
Select `VPN` for attachment type
Select `Existing` for `Customer gateway`
Click `Customer gateway ID` dropdown and select `ONPREM-ROUTER1`
Click `Dynamic` for `Routing options`
Click `Enable Acceleration`
Click `Create Attachment`

Click `Create Transit Gateway Attachment`
Click `Transit Gateway ID` dropdown and select `A4LTGW`
Select `VPN` for attachment type
Select `Existing` for `Customer gateway`
Click `Customer gateway ID` dropdown and select `ONPREM-ROUTER2`
Click `Dynamic` for `Routing options`
Click `Enable Acceleration`
Click `Create Attachment`

Move to `Site-to-Site VPN Connections` under `Virtual Private Network` https://console.aws.amazon.com/vpc/home?region=us-east-1#VpnConnections:sort=VpnConnectionId

For each of the connections, it will show you the `Customer Gateway Address` these match `ONPREM-ROUTER1 Public` and `ONPREM-ROUTER2 Public`

Select the line which matches Router1PubIP
Click `Download Configuration`
Change vendor to `Generic`
Click Download
Rename this file to `CONNECTION1CONFIG.TXT`
Select the line which matches Router2PubIP
Click `Download Configuration`
Change vendor to `Generic`
Click Download
Rename this file to `CONNECTION2CONFIG.TXT`

# STAGE 2B - POPULATE DEMO VALUE TEMPLATE WITH ALL CONFIG VALUES

Populate the DemoValueTemplate, instructions are in that template.


# STAGE 3A - CONFIGURE IPSEC TUNNELS FOR ONPREMISES-ROUTER1

BEFORE DOING THIS STAGE
BOTH VPN CONNECTIONS
Wait for `State` to change from `pending` to `available` for both attachments
~ 15 minutes

(YOU WILL NEED THE CONNECTION1CONFIG.TXT) File you saved earlier

Move to EC2 Console
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState
Click `Instances` on the left menu
Locate and select `ONPREM-ROUTER1`
Right Click => `Connect`
Select `Session Manager`
Click `Connect`
`sudo bash`
`cd /home/ubuntu/demo_assets/`
`nano ipsec.conf`

This is is the file which configures the IPSEC Tunnel interfaces over which our VPN traffic flows.
This configures the ones for ROUTER1 -> BOTH AWS Endpoints

Replace the following placeholders with the real values in the `DemoValueTemplate.md` document

- ROUTER1_PRIVATE_IP
- CONN1_TUNNEL1_ONPREM_OUTSIDE_IP
- CONN1_TUNNEL1_AWS_OUTSIDE_IP
- CONN1_TUNNEL1_AWS_OUTSIDE_IP
and
- ROUTER1_PRIVATE_IP
- CONN1_TUNNEL2_ONPREM_OUTSIDE_IP
- CONN1_TUNNEL2_AWS_OUTSIDE_IP
- CONN1_TUNNEL2_AWS_OUTSIDE_IP

`ctrl+o` to save and `ctrl+x` to exit

`nano ipsec.secrets`

This file controls authentication for the tunnels
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document

- CONN1_TUNNEL1_ONPREM_OUTSIDE_IP
- CONN1_TUNNEL1_AWS_OUTSIDE_IP
- CONN1_TUNNEL1_PresharedKey
and
- CONN1_TUNNEL2_ONPREM_OUTSIDE_IP
- CONN1_TUNNEL2_AWS_OUTSIDE_IP
- CONN1_TUNNEL2_PresharedKey

`Ctrl+o` to save
`Ctrl+x` to exit

`nano ipsec-vti.sh`

This script brings UP the tunnel interfaces when needed
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document

- CONN1_TUNNEL1_ONPREM_INSIDE_IP  (ensuring the /30 is at the end)
- CONN1_TUNNEL1_AWS_INSIDE_IP (ensuring the /30 is at the end)
- CONN1_TUNNEL2_ONPREM_INSIDE_IP (ensuring the /30 is at the end)
- CONN1_TUNNEL2_AWS_INSIDE_IP (ensuring the /30 is at the end)

`Ctrl+o` to save
`Ctrl+x` to exit

`cp ipsec.conf /etc`
`cp ipsec.secrets /etc`
`cp ipsec-vti.sh /etc`
`chmod +x /etc/ipsec-vti.sh`

`systemctl restart strongswan` to restart strongswan ... this should bring up the tunnels


# STAGE 3B - CONFIGURE IPSEC TUNNELS FOR ONPREMISES-ROUTER2

(YOU WILL NEED THE CONNECTION2CONFIG.TXT) File you saved earlier

Move to EC2 Console
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState
Click `Instances` on the left menu
Locate and select `ONPREM-ROUTER1`
Right Click => `Connect`
Select `Session Manager`
Click `Connect`

`sudo bash`
`cd /home/ubuntu/demo_assets/`
`nano ipsec.conf`

This is is the file which configures the IPSEC Tunnel interfaces over which our VPN traffic flows.
This configures the ones for ROUTER1 -> BOTH AWS Endpoints

Replace the following placeholders with the real values in the `DemoValueTemplate.md` document

- ROUTER2_PRIVATE_IP
- CONN2_TUNNEL1_ONPREM_OUTSIDE_IP
- CONN2_TUNNEL1_AWS_OUTSIDE_IP
- CONN2_TUNNEL1_AWS_OUTSIDE_IP
and
- ROUTER2_PRIVATE_IP
- CONN2_TUNNEL2_ONPREM_OUTSIDE_IP
- CONN2_TUNNEL2_AWS_OUTSIDE_IP
- CONN2_TUNNEL2_AWS_OUTSIDE_IP

`ctrl+o` to save and `ctrl+x` to exit

`nano ipsec.secrets`

This file controls authentication for the tunnels
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document

- CONN2_TUNNEL1_ONPREM_OUTSIDE_IP
- CONN2_TUNNEL1_AWS_OUTSIDE_IP
- CONN2_TUNNEL1_PresharedKey
and
- CONN2_TUNNEL2_ONPREM_OUTSIDE_IP
- CONN2_TUNNEL2_AWS_OUTSIDE_IP
- CONN2_TUNNEL2_PresharedKey

`Ctrl+o` to save
`Ctrl+x` to exit

`nano ipsec-vti.sh`

This script brings UP the tunnel interfaces when needed
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document

- CONN2_TUNNEL1_ONPREM_INSIDE_IP  (ensuring the /30 is at the end)
- CONN2_TUNNEL1_AWS_INSIDE_IP (ensuring the /30 is at the end)
- CONN2_TUNNEL2_ONPREM_INSIDE_IP (ensuring the /30 is at the end)
- CONN2_TUNNEL2_AWS_INSIDE_IP (ensuring the /30 is at the end)

`Ctrl+o` to save
`Ctrl+x` to exit

`cp ipsec* /etc`
`chmod +x /etc/ipsec-vti.sh`

`systemctl restart strongswan` to restart strongswan ... this should bring up the tunnels


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

# STAGE 5 - CLEANUP

- Delete the on-premises stack
- Delete the VPN COnnections
- Delete the customer Gateways
- WAIT FOR THE CONNECTIONS TO BE REMOVED
- Delete the ONPREM STACK
- Delete the AWS Stack

