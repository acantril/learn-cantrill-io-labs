# Advanced Highly-Available Dynamic Site-to-Site VPN

In this STAGE .. you will e configuring each of the on premises Ubuntu, strongSwan Routers to create IPSEC tunnels to AWS. Each Router ... will create 2 IPSEC tunnels ... each going to a different AWS Endpoint. Its worth checking the visual PNG file which accompanies this STAGE to understand tunnel architecture.  

Make sure before starting this stage that both VPN connections are in an `available` state  
** You will need the completed DemoValueTemplate.md file for this stage **  

# STAGE 3A - CONFIGURE IPSEC TUNNELS FOR ONPREMISES-ROUTER1

Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `ONPREM-ROUTER1`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

- `sudo bash`  
- `cd /home/ubuntu/demo_assets/`  
- `nano ipsec.conf`  

This is is the file which configures the IPSEC Tunnel interfaces over which our VPN traffic flows.  
As we are connected to Router 1 - This configures the ones for ROUTER1 -> BOTH AWS Endpoints  

Replace the following placeholders with the real values in the `DemoValueTemplate.md` document  

- `ROUTER1_PRIVATE_IP`  
- `CONN1_TUNNEL1_ONPREM_OUTSIDE_IP`  
- `CONN1_TUNNEL1_AWS_OUTSIDE_IP`  
- `CONN1_TUNNEL1_AWS_OUTSIDE_IP`  
and  
- `ROUTER1_PRIVATE_IP`  
- `CONN1_TUNNEL2_ONPREM_OUTSIDE_IP`  
- `CONN1_TUNNEL2_AWS_OUTSIDE_IP`  
- `CONN1_TUNNEL2_AWS_OUTSIDE_IP`  

`ctrl+o` to save and `ctrl+x` to exit  

`nano ipsec.secrets`  

This file controls authentication for the tunnels  
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document  

- `CONN1_TUNNEL1_ONPREM_OUTSIDE_IP`  
- `CONN1_TUNNEL1_AWS_OUTSIDE_IP`  
- `CONN1_TUNNEL1_PresharedKey`  
and  
- `CONN1_TUNNEL2_ONPREM_OUTSIDE_IP`  
- `CONN1_TUNNEL2_AWS_OUTSIDE_IP`  
- `CONN1_TUNNEL2_PresharedKey`  

`Ctrl+o` to save  
`Ctrl+x` to exit  

`nano ipsec-vti.sh`  

This script brings UP the IPSEC tunnel interfaces when needed  
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document  

- `CONN1_TUNNEL1_ONPREM_INSIDE_IP`  (ensuring the /30 is at the end)  
- `CONN1_TUNNEL1_AWS_INSIDE_IP` (ensuring the /30 is at the end)  
- `CONN1_TUNNEL2_ONPREM_INSIDE_IP` (ensuring the /30 is at the end)  
- `CONN1_TUNNEL2_AWS_INSIDE_IP` (ensuring the /30 is at the end)  

`Ctrl+o` to save  
`Ctrl+x` to exit  

`cp ipsec* /etc`  
`chmod +x /etc/ipsec-vti.sh`  

Now all the configuration for Router1 IPSEC has been completed, lets restart the strongSwan service to bring them up.  

`systemctl restart strongswan` to restart strongSwan ... this should bring up the tunnels  

We can check these tunnels are up by running  
`ifconfig`  
You should see `vti1` and `vti2` interfaces  
You can also check the connection in the AWS VPC Console ...the tunnels should be down, but IPSEC should be shown as UP after a few minutes.  


# STAGE 3B - CONFIGURE IPSEC TUNNELS FOR ONPREMISES-ROUTER2

(YOU WILL NEED THE CONNECTION2CONFIG.TXT) File you saved earlier  

Move to EC2 Console  
https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceState  
Click `Instances` on the left menu  
Locate and select `ONPREM-ROUTER2`  
Right Click => `Connect`  
Select `Session Manager`  
Click `Connect`  

`sudo bash`  
`cd /home/ubuntu/demo_assets/`  
`nano ipsec.conf`  

This is is the file which configures the IPSEC Tunnel interfaces over which our VPN traffic flows.  
As we are connected to Router 2 - This configures the ones for ROUTER2 -> BOTH AWS Endpoints  
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document  

- `ROUTER2_PRIVATE_IP`  
- `CONN2_TUNNEL1_ONPREM_OUTSIDE_IP`  
- `CONN2_TUNNEL1_AWS_OUTSIDE_IP`  
- `CONN2_TUNNEL1_AWS_OUTSIDE_IP`  
and  
- `ROUTER2_PRIVATE_IP`  
- `CONN2_TUNNEL2_ONPREM_OUTSIDE_IP`  
- `CONN2_TUNNEL2_AWS_OUTSIDE_IP`  
- `CONN2_TUNNEL2_AWS_OUTSIDE_IP`  

`ctrl+o` to save and `ctrl+x` to exit  

`nano ipsec.secrets`  

This file controls authentication for the tunnels  
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document  

- `CONN2_TUNNEL1_ONPREM_OUTSIDE_IP`  
- `CONN2_TUNNEL1_AWS_OUTSIDE_IP`  
- `CONN2_TUNNEL1_PresharedKey`  
and  
- `CONN2_TUNNEL2_ONPREM_OUTSIDE_IP`  
- `CONN2_TUNNEL2_AWS_OUTSIDE_IP`  
- `CONN2_TUNNEL2_PresharedKey`  

`Ctrl+o` to save  
`Ctrl+x` to exit  

`nano ipsec-vti.sh`  

This script brings UP the tunnel interfaces when needed  
Replace the following placeholders with the real values in the `DemoValueTemplate.md` document  

- `CONN2_TUNNEL1_ONPREM_INSIDE_IP`  (ensuring the /30 is at the end)  
- `CONN2_TUNNEL1_AWS_INSIDE_IP` (ensuring the /30 is at the end)  
- `CONN2_TUNNEL2_ONPREM_INSIDE_IP` (ensuring the /30 is at the end)  
- `CONN2_TUNNEL2_AWS_INSIDE_IP` (ensuring the /30 is at the end)  

`Ctrl+o` to save  
`Ctrl+x` to exit  

`cp ipsec* /etc`  
`chmod +x /etc/ipsec-vti.sh`  

Now all the configuration for Router1 IPSEC has been completed, lets restart the strongSwan service to bring them up.  

`systemctl restart strongswan` to restart strongSwan ... this should bring up the tunnels  

We can check these tunnels are up by running  
`ifconfig`  
You should see `vti1` and `vti2` interfaces  
You can also check the connection in the AWS VPC Console ...the tunnels should be down, but IPSEC should be shown as UP after a few minutes.  

# FINISH

When all 4 IPSEC TUNNELS are up ... `vti1` and `vti2` on `Router1` and `Router2` you can complete this stage of the DEMO and move on.  
There is now network connectivity between the ONPREM and AWS environments, but as these are Dynamic BGP Connections ..   
.. the next stage will add BGP capability to activate the connections.  

