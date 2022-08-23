# Advanced Demo - Simple Site2Site VPN

![Architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-simple-site2site-vpn/Architecture.png)

In this mini project you will implement a site to site VPN between AWS and a simulated on-premises business site running the pfSense router/NAT software.

The demo consists of 5 stages, each implementing additional components of the architecture  

- Stage 1 - Create Site2Site VPN
- Stage 2 - Configure onpremises Router  
- Stage 3 - Routing & Security
- Stage 4 - Testing
- Stage 6 - Cleanup

## 1-Click Install

- Make sure you are logged into AWS and in `us-east-1`
- you will need to approve this [subscription](https://aws.amazon.com/marketplace/pp?sku=cphb99lr7icr3n9x6kc3102s5) it's a trial, so you won't be billed anything extra. 
- You will need to have an SSH keypair created in `us-east-1` and select this when using the 1-click deployment below
- Once approved, you can use the one click deployment below.

- [SimpleSite2SiteVPN](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-simple-site2site-vpn/infra.yaml&stackName=S2SVPN)  (**be sure to select a keypair**)

## Instructions

- [Stage1 - Create Site2Site VPN](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE1.md)
- [Stage2 - Configure onpremises Router](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE2.md)
- [Stage3 - Routing & Security](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE3.md)
- [Stage4 - Testing](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE4.md)
- [Stage5 - Cleanup](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE5.md)

## Video Guides

- [STAGE0](https://youtu.be/v9PactTXMTQ)
- [STAGE1](https://youtu.be/oizexSe2ajQ)
- [STAGE2](https://youtu.be/2LZRxc7UZns)
- [STAGE3](https://youtu.be/mUgXjnAJHFA)
- [STAGE4](https://youtu.be/RjietVauypA)
- [STAGE5](https://youtu.be/yMb1UXqwsCA)

## Architecture Diagrams

- [Stage0](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE0.pdf)
- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE1.pdf)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE2.pdf)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-simple-site2site-vpn/02_LABINSTRUCTIONS/STAGE4.pdf)
