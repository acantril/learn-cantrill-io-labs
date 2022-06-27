# Advanced Demo - Hybrid DNS between AWS and Simulated On-Premises

In this advanced demo you will get the chance to experience how to integrate the DNS platforms of AWS and a linux based, simulated on-premises environment using Route53 inbound and outbound endpoints.

The demo consists of 4 stages, each implementing additional components of the architecture  

- Stage 1 - Provision and Verify  
- Stage 2 - Connectivity  
- Stage 3 - Inbound R53 Endpoint (Onprem => AWS) 
- Stage 4 - Outbound R53 Endpoint (AWS => Onprem)

![Architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-dns/hybrid-dns-endstate.png)

## 1-Click Install
Make sure you are logged into AWS and in `us-east-1`  

- [HYBRIDDNS](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-hybrid-dns/HybridDNS.yaml&stackName=HYBRIDDNS)

## Instructions

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-dns/02_LABINSTRUCTIONS/STAGE1%20-%20Provision%20%26%20Verify.md)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-dns/02_LABINSTRUCTIONS/STAGE2%20-%20Provision%20Connectivity.md)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-dns/02_LABINSTRUCTIONS/STAGE3%20-%20Inbound%20Endpoints.md)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-dns/02_LABINSTRUCTIONS/STAGE4%20-%20Outbound%20Endpoints.md)

## Video Guides

- [STAGE1](https://youtu.be/UmPTavtAB9s)
- [STAGE2](https://youtu.be/n1vSVxUhsQ4)
- [STAGE3](https://youtu.be/uN49-noXk2I)
- [STAGE4](https://youtu.be/0nub1kV1Hg8)

## Architecture Diagrams

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-dns/02_LABINSTRUCTIONS/Architecture-INITIALSTATE.png)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-dns/02_LABINSTRUCTIONS/Architecture-STAGE2-PROVISIONCONNECTIVITY.png)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-dns/02_LABINSTRUCTIONS/Architecture-STAGE3-INBOUNDENDPOINTS.png)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-dns/02_LABINSTRUCTIONS/Architecture-STAGE4-OUTBOUNDENDPOINTS.png)
