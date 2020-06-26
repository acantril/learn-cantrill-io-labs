# Advanced Highly-Available Dynamic Site-to-Site VPN

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

