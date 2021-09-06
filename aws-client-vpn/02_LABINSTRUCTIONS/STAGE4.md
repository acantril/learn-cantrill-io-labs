# Advanced Demo - AWS Client VPN - Configure VPN Endpoint & Associations

![Stage4 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-client-vpn/02_LABINSTRUCTIONS/STAGE4.png)

- Stage 1 - Create Directory Service (authentication for VPN users) 
- Stage 2 - Certificates 
- Stage 3 - Create VPN Endpoint 
- Stage 4 - Configure VPN Endpoint & Associations <= `YOU ARE HERE`
- Stage 5 - Download, install and test VPN Client
- Stage 6 - Cleanup

**Please make sure the Directory Service created in the previous step is in an `Active` state.**  
**Please make sure you have created and imported the server certificate from stage 2 before starting stage3** 
**Please make sure the VPN endpoint has been created in the previous stage** 

# Associate ClientVPN Endpoint  

- From the `Client VPN Endpoints` area of the VPC console, select the `A4L Client VPN` endpoint.  
- Click the `Associations` tab and click `Associate`  
- Click the `VPC*` dropdown and click the `A4L-VPC`  
- Open in a new tab, the VPC, Subnets console https://console.aws.amazon.com/vpc/home?region=us-east-1#subnets:  
- Locate the subnet ID for the 3 private subnets in the A4L VPC  
- Click the `Choose a subnet to associate*` dropdown and pick the first available PRIV subnet from the list (PRIV-A, PRIV-B, PRIV-C)  
- Click `Associate`  then click `Close`  

The VPN Endpoint will now be associated, you need to pause here and wait for the state of the VPN endpoint to change from `Pending-associate` to `Available`
