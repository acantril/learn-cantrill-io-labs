# Advanced Demo - Hybrid Directory between AWS and Simulated On-Premises


In this advanced demo you will get the chance to experience how to integrate on-premises active directory with AWS.  
You get to integrate two Active Directory Domains with a two-way forest trust and use AWS services with on-premise identities.   
The demo uses Directory Service, FSx and Workspaces.  

The demo consists of 5 stages, each implementing additional components of the architecture  

- Stage 1 - AWS and ONPREM Setup  
- Stage 2 - OnPREM Jumpbox  
- Stage 3 - Create Managed Microsoft AD in AWS  
- Stage 4 - Create TRUST  
- Stage 5 - Create FSx and MIgrate Data  
- Stage 6 - CReate workspace and migrate data  
- Stage 7 - Cleanup  

![Architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-activedirectory/hybriddirectoryadvdemo.png)

## Instructions

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/STAGE1%20-%20AWS%20and%20ONPREM%20Setup.md)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/STAGE2%20-%20Connect%20to%20the%20ONPREMISES%20Jumpbox.md)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/STAGE3%20-%20Create%20Managed%20Microsoft%20AD%20within%20AWS.md)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/STAGE4%20-%20Create%20Trust.md)
- [Stage5](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/STAGE5%20-%20Create%20FSx%20and%20Migrate%20data.md)
- [Stage6](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/STAGE6%20-%20Create%20workspace%20and%20migrate%20desktop.md)
- [Stage7](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/STAGE7%20-%20CLEANUP.md)

## 1-Click Installs
Make sure you are logged into AWS and in `us-east-1`  

- [HYBRIDDIR](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-hybrid-activedirectory/01_HYBRIDDIR.yaml&stackName=HYBRIDDIR)

## Video Guides


- [Stage1](https://youtu.be/_7jm6qAB77A)
- [Stage2](https://youtu.be/T5jjoFExeFQ)
- [Stage3](https://youtu.be/koX7ueF4wsw)
- [Stage4](https://youtu.be/oaTisDILzUk)
- [Stage5](https://youtu.be/ejcDksH0EPk)
- [Stage6](https://youtu.be/i6YDt6YW8hc)
- [Stage7](https://youtu.be/hI7NByXI2EU)


## Architecture Diagrams

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/Architecture-STAGE1.png)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/Architecture-STAGE2.png)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/Architecture-STAGE3.png)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/Architecture-STAGE4.png)
- [Stage5](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/Architecture-STAGE5.png)
- [Stage6](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-hybrid-activedirectory/02_LABINSTRUCTIONS/Architecture-STAGE6.png)
