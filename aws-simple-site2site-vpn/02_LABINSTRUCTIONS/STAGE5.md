# Advanced Demo - Advanced Demo - Simple Site2Site VPN

![Stage1 - PNG](TBC)

- Stage 1 - Create Site2Site VPN 
- Stage 2 - Configure onpremises Router 
- Stage 3 - Routing & Security 
- Stage 4 - Testing 
- Stage 5 - Cleanup <= `YOU ARE HERE`


# VPN CONECTION

Go to the `VPC` console, under `Virtual Private Network (VPN)` click `Site-to-Site VPN Connections`  
Select `AWS-Site2SiteVPN`, click `Actions`, `Delete VPN Connection`   
Type `delete` and Click `Delete`  

# CUSTOMER GATEWAY

Go to the `VPC` console, under `Virtual Private Network (VPN)` click `Customer Gateways`  
Select `A4L-onpremRouter`, click `Actions`, `Delete Customer Gateway`  
Type `delete` and click `Delete`  

# VGW DETACH AND DELETE


Go to the `VPC` console, under `Virtual Private Network (VPN)` click `Virtual Private Gateways`  
Select `awsVGW`, click `Actions`, `Detach from VPC`, click `Detach virtual private gateway`  
Click `Actions`, `Delete Virtual private gateway`  
Type `delete` and click `Delete`  


# CLOUDFORMATION DELETE

Go to the cloudformation console  
Click `Stacks`  
Select the `S2SVPN` stack, click `Delete` then `Delete Stack`  

