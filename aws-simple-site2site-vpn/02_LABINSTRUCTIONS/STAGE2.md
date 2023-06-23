# Advanced Demo - Advanced Demo - Simple Site2Site VPN

![Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE2.png)

- Stage 1 - Create Site2Site VPN 
- Stage 2 - Configure onpremises Router <= `YOU ARE HERE`
- Stage 3 - Routing & Security
- Stage 4 - Testing
- Stage 5 - Cleanup

# Login to the onpremRouter

Move to the EC2 console, Click `Instances` under `Instances`  
Select `onpremRouter`, note down the `Public IPv4 address`  
right click, `monitor and troubleshoot` then `Get System Log`  
Locate `ec2-user password changed to:` and note down the password of the `router`  
Browse to https://onpremRouterPublicIPv4  
Enter the `Username` `admin`  
Enter the `Password` you just copied down  
Click `SIGN IN`  
Click the `pfSense+` logo at the top left of the screen to bypass the wizard. 
Click `Accept` on any copyright ot trademark notices (these might not show). 
Click `Close` on any informational notices (these might not show). 

# Configure Networking of pfSense router

In pfSense click `Interfaces` => `Assignments`.  
You will see WAN & ena0.  
CLick the `+ Add` next to the `available network ports`, this should change to LAN, click `Save` if shown.  
Click `Interfaces` => `LAN`.  
Check `Enable interface`.  
for `IPv4 Configuration Type` set to `DHCP`.  
click `Save`.  
Click `Apply Changes` (if shown)  


This means the pfSense router now has WAN (public) and LAN (private) interfaces.  


# VPN

For all of the steps below **make sure you have your VPN configuration file downloaded and ready, this will give you your specific values to input**. 

Click `VPN` => `IPSec'. 

# Create phase 1 tunnel to AWS AZ-1

Click `+ Add P1`.  
set `Description` to `AWS-Tunnel-AZ1`  
Ensure that `Diabled` is `unchecked`.  
Set `Key Exchange Version` to `IKEv1`.  
Set `Internet Protocol` to `IPv4`.  
set `Interface` to `WAN`.  
set `Remote Gateway` to be the IP address listed under `IPSec Tunnel #1`, `General information`, `Remote Gateway`   
ensure `Authentication Method` is set to `Mutual PSK`.  
ensure `Negotiation mode` is set to `Main`.  
ensure `My Identifier` is set to `My IP Address`.  
ensure `Peer Identifier` is set to `Peer IP Address`   
set `Pre-Shared Key` to be the key listed under `IPSec Tunnel #1`, `Phase 1 proposal (Authentication)`, `Pre-Shared Key`  

set `Encryption Algorithm` to be `AES` `128 Bits` `SHA1` `2(1024 bit)`.  
set `Life Time` to be `28800`.  

ensure `Dead Peer Detection` is `checked`.  
ensure `NAT Traversal` is `Auto`.  
ensure `Delay` is `10`.  
ensure `Max failures` is set to `3`  

Click `Save`.  

# Configure IPSEC AWS AZ-1 

Click `Show Phase 2 Entries` under the `AWS-Tunnel-AZ1`.  
Click `+ Add P2`.  
For `Description` enter `IPSEC-Tunnel1-AWS-AZ1`  
ensure `Disabled` is `unchecked`.  
ensure `Mode` is set to `Tunnel IPv4`.  
set `Local Network` type to `Network`.  
on the same line set `Address` to `192.168.10.0` and `/24`.  
set `Remote Network` type to `Network`.  
on the same line set `Address` to `10.16.0.0` and `/16`.  
Ensure `Protocol` is set to `ESP`.  
Ensure `AES` is checked and its dropdown is `128 bits`  
Ensure under `Hash Algorithms` `SHA1` is checked.  
Ensure `PFS key group` is set to `2 (1024 bit)`.   
Ensure `Life Time` is `3600`.   
for `Automatically ping host` set this to the private ip of `awsServerA` (you can get this from the EC2 console)  
Check `Enable periodic keep alive check`.   
Click `Save`.   


# Create phase 1 tunnel to AWS AZ-2

Click `+ Add P1`.  
set `Description` to `AWS-Tunnel-AZ2`  
Ensure that `Diabled` is `unchecked`.   
Set `Key Exchange Version` to `IKEv1`.   
Set `Internet Protocol` to `IPv4`.  
set `Interface` to `WAN`.  
set `Remote Gateway` to be the IP address listed under `IPSec Tunnel #2`, `General information`, `Remote Gateway`    
ensure `Authentication Method` is set to `Mutual PSK`.   
ensure `Negotiation mode` is set to `Main`.  
ensure `My Identifier` is set to `My IP Address`.   
ensure `Peer Identifier` is set to `Peer IP Address`    
set `Pre-Shared Key` to be the key listed under `IPSec Tunnel #2`, `Phase 1 proposal (Authentication)`, `Pre-Shared Key`  

set `Encryption Algorithm` to be `AES` `128 Bits` `SHA1` `2(1024 bit)`.  
set `Life Time` to be `28800`.  

ensure `Dead Peer Detection` is `checked`.   
ensure `NAT Traversal` is `Auto`.   
ensure `Delay` is `10`.   
ensure `Max failures` is set to `3`  

Click `Save`.  


# Configure IPSEC AWS AZ-2  

Click `Show Phase 2 Entries` under the `AWS-Tunnel-AZ2`.   
Click `+ Add P2`.   
For `Description` enter `IPSEC-Tunnel2-AWS-AZ2`  
ensure `Disabled` is `unchecked`.   
ensure `Mode` is set to `Tunnel IPv4`.   
set `Local Network` type to `Network`.   
on the same line set `Address` to `192.168.10.0` and `/24`.   
set `Remote Network` type to `Network`.   
on the same line set `Address` to `10.16.0.0` and `/16`.   
Ensure `Protocol` is set to `ESP`.  
Ensure `AES` is checked and its dropdown is `128 bits`  
Ensure under `Hash Algorithms` `SHA1` is checked.  
Ensure `PFS key group` is set to `2 (1024 bit)`.   
Ensure `Life Time` is `3600`.   
for `Automatically ping host` set this to the private ip of `awsServerA` (you can get this from the EC2 console)  
Check `Enable periodic keep alive check`.   
Click `Save`.   

# initially connect the VPN Tunnels and IPSec  

Click `Apply Changes`.   
Click `Status` => `IPSec`.   
Click `Connect P1 and P2s` next to both lines.   


