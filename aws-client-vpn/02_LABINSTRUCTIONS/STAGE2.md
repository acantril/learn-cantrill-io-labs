# Advanced Demo - AWS Client VPN - Certificates

![Stage2 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-client-vpn/02_LABINSTRUCTIONS/STAGE2.png)

- Stage 1 - Create Directory Service (authentication for VPN users) 
- Stage 2 - Certificates <= `YOU ARE HERE`
- Stage 3 - Create VPN Endpoint
- Stage 4 - Configure VPN Endpoint & Associations
- Stage 5 - Download, install and test VPN Client
- Stage 6 - Cleanup

**Please make sure the Directory Service created in the previous step is in an `Active` state before continuing.**  

# Creating Certificates

# Server Certificate

This past of the demo involves downloading easy-rsa and using this to create certificates which will be imported into ACM. If using this in production, you can create server and client certificates for mutual authentication. To keep things simple (the focus is on ClientVPN itself) we will only be using the server certificate.

## Linux/macOS

- open a terminal
- cd /tmp 
- git clone https://github.com/OpenVPN/easy-rsa.git
- cd easy-rsa/easyrsa3
- ./easyrsa init-pki
- ./easyrsa build-ca nopass
- - ANIMALS4LIFEVPN
- ./easyrsa build-server-full server nopass
- aws acm import-certificate --certificate fileb://pki/issued/server.crt --private-key fileb://pki/private/server.key --certificate-chain fileb://pki/ca.crt --profile iamadmin-general

## Windows

- Open the OpenVPN Community Downloads page, download the Windows installer for your version of Windows, and run the installer. 
- Open the EasyRSA releases page and download the ZIP file for your version of Windows. Extract the ZIP file and copy the EasyRSA folder to the \Program Files\OpenVPN folder. 
- Open the command prompt as an Administrator, navigate to the \Program Files\OpenVPN\EasyRSA directory, and run the following command to open the EasyRSA 3 shell.
- EasyRSA-Start
- ./easyrsa init-pki
- ./easyrsa build-ca nopass
- ./easyrsa build-server-full server nopass
- ./easyrsa build-client-full client1.domain.tld nopass
- exit

- aws acm import-certificate --certificate fileb://pki/issued/server.crt --private-key fileb://pki/private/server.key --certificate-chain fileb://pki/ca.crt --profile iamadmin-general


- Type `ACM` or `Certificate Manager` into the search box at the top of the screen then right click and open in a new tab.
- Verify that your certificate exists in the `us-east-1` region.  



`END OF STAGE2`
