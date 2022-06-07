# Advanced Highly-Available Dynamic Site-to-Site VPN

In STAGE2 of the DEMO lesson you will be creating two VPN attachments for the Transit GATEWAY
This has the effect of creating two VPN connections ... 1 for each of the customer gateways
Each connection has 2 Tunnels ... one between AWS Endpoint A => Customer Gateway and one between AWS Endpoint B => Customer Gateway
Once the connections have been created, you will download the configuration files which will be required to configure the onpremises VPN endpoints (customer gateways)

# STAGE 2A - CREATE VPN ATTACHMENTS FOR TRANSIT GATEWAY

Move back to `Transit Gateway Attachments` https://console.aws.amazon.com/vpc/home?region=us-east-1#TransitGatewayAttachments:sort=transitGatewayAttachmentId  

Click `Create Transit Gateway Attachment`  
Click `Transit Gateway ID` dropdown and select `A4LTGW`  
Select `VPN` for attachment type  
Select `Existing` for `Customer gateway`  
Click `Customer gateway ID` dropdown and select `ONPREM-ROUTER1`  
Click `Dynamic (requires BGP)` for `Routing options`  
Click `Enable Acceleration`  
Click `Create Attachment`  

Click `Create Transit Gateway Attachment`  
Click `Transit Gateway ID` dropdown and select `A4LTGW`  
Select `VPN` for attachment type  
Select `Existing` for `Customer gateway`  
Click `Customer gateway ID` dropdown and select `ONPREM-ROUTER2`  
Click `Dynamic (requires BGP)` for `Routing options`  
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

Review Tunnel Anatomy graphic  

There is a document in this folder called `DemoValueTemplate.md` - it contains instructions on how to extract all of the configuration variables you will need  
You will extract these from three locations  

- Outputs of the ONPREM CFN Stack  
- For Connection1, `CONNECTION1CONFIG.TXT`  
- For Connection2, `CONNECTION2CONFIG.TXT`  

Go ahead and populate that template using the instructions in the template  

# FINISH

At that point, you have finished this STAGE .. when you're ready move onto STAGE3  

