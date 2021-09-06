![Stage6 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-client-vpn/02_LABINSTRUCTIONS/STAGE6.png)

- Stage 1 - Create Directory Service (authentication for VPN users) 
- Stage 2 - Certificates 
- Stage 3 - Create VPN Endpoint 
- Stage 4 - Configure VPN Endpoint & Associations 
- Stage 5 - Download, install and test VPN Client 
- Stage 6 - Cleanup <= `YOU ARE HERE`

# CLIENT VPN ENDPOINT

- Open the Client VPN Connection console https://console.aws.amazon.com/vpc/home?region=us-east-1#ClientVPNEndpoints:
- Select `A4L Client VPN`, Click `Associations`, Click `Disassociate`, Click `Yes, Dissasociate`
- Wait for the `Disassociate` to finish.
- Select `A4L Client VPN`, then click `Actions`, `Delete Client VPN Endpont`, Click `Yes, Delete`
- Wait for the Client VPN Endpoint to finish deleting

# CERT

- Type `ACM` or `Certificate Manager` into the search box at the top of the screen then right click and open in a new tab.
- Select the server certificate, Click `Actions`, Click `Delete`, Click `Delete`

# Directory Service

- Type `Directory Service` into the top searchbox and open the directory services console in a new tab.  
Or use directly open via https://console.aws.amazon.com/directoryservicev2/identity?region=us-east-1#!/directories  
- Select the directory created in stage 1
- Click `Actions` then `Delete directory`
- Type the name of the directory an then click `Delete`
- Wait for the directory to finish deleting before moving on.

# STACK

- Type `CloudFormation` into the top searchbox and open the CloudFormation console in a new tab. https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringStatus=active&filteringText=&viewNested=true&hideStacks=false  
- Select the `A4L` Stack, Click `Delete`, click `Delete Stack`  

# LOCAL 

- Open Manage profiles
- Delete the A4L profile
- optionally delete the AWS Client VPN Software

