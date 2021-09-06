# Advanced Demo - AWS Client VPN - Create VPN Endpoint

![Stage3 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-client-vpn/02_LABINSTRUCTIONS/STAGE3.png)

- Stage 1 - Create Directory Service (authentication for VPN users) 
- Stage 2 - Certificates 
- Stage 3 - Create VPN Endpoint <= `YOU ARE HERE`
- Stage 4 - Configure VPN Endpoint & Associations
- Stage 5 - Download, install and test VPN Client
- Stage 6 - Cleanup

**Please make sure the Directory Service created in the previous step is in an `Active` state.**  
**Please make sure you have created and imported the server certificate from stage 2 before starting stage3**  

# Create VPN Endpoint

- Type VPC in the services search box at the top of the screen, right click and open in a new tab.  
- Under Virtual Private Network (VPN) on the menu on the left, locate and click `Create VPN Endpoint`  
- Click `Create Client VPN Endpoint`  
- For `Name Tag` enter `A4L Client VPN`  
- Under `Client IPv4 CIDR*` enter `192.168.12.0/22`  
- Click the `Server certificate ARN*` dropdown and select the server certificate you created in stage 2.  
- Under `Authentication Options` check `Use user-based authentication`  
- Check `Active Directory authentication`  
- Under `Directory ID*` chose the directory you created in Stage 1 (e.g. corp.animals4life.org) 
- Under `Connection Logging`, `Do you want to log the details on client connections?*` check `no`  
- for `DNS Server 1 IP address` and `DNS Server 2 IP address` we need to enter the IP addresses of the directory service instance. Go back to the tab with the directory service console open, click the directory service instance ID , locate the `DNS address` area and copy one IP into each of the DNS Server IP boxes.  
- Check `Enable split-tunnel`  
- in the `VPC ID` dropdown select `A4L-VPC`  
- Ensure the `Default` SG is checked and the `A4L DefaultSG`
- Check `Enable self-service portal`  
- Click `Create Client VPN Endpoint`  
- Click `Close`  

At this point the VPN endpoint is ready for configuration in the next stage
