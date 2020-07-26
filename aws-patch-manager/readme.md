# Advanced Demo - Systems Manager in a Hybrid Environment (with a focus on patch manager)

In this advanced demo you will get the chance to experience AWS Systems Manager. 
The demo simulates a Hybrid AWS and On-premises environment - both using AWS.  

The demo consists of 5 stages, each implementing additional components of the architecture

- Stage 1 - Provision the environments
- Stage 2 - Configure AWS Based Managed Instances & fix missing SSM agent
- Stage 3 - Setup On-Prem Managed instances using Hybrid Activations
- Stage 4 - Configure Systems Manager Inventory & Patching
- Stage 5 - Verify and Demo Teardown

![end state architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-patch-manager/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE4.png)

## Instructions

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-patch-manager/02_LABINSTRUCTIONS/STAGE1%20-%20Provision%20%26%20Verify.md)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-patch-manager/02_LABINSTRUCTIONS/STAGE2%20-%20AWS%20Managed%20Instances.md)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-patch-manager/02_LABINSTRUCTIONS/STAGE3%20-%20On-Prem%20Managed%20Instances.md)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-patch-manager/02_LABINSTRUCTIONS/STAGE4%20-%20Configure%20Patching.md)
- [Stage5](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-patch-manager/02_LABINSTRUCTIONS/STAGE5%20-%20Verify%20Patching.md)

## 1-Click Installs
Make sure you are logged into AWS and in `us-east-1`  
Apply the first template and THEN once the first is in `CREATE_COMPLETE` the second

- [Base Infrastructure](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-patch-manager/PatchManagerBase.yaml&stackName=SSMBASE)
- [VPCe and Role](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-patch-manager/PatchManagerVPCEndpointsandRole.yaml&stackName=SSMVPCE)

## Architecture Diagrams

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-patch-manager/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE1.png)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-patch-manager/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE2.png)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-patch-manager/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE3.png)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-patch-manager/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE4.png)

