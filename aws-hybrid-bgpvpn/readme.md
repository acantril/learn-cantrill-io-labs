# Advanced Demo - Site-To-Site VPN

In this advanced demo you will get the chance to implement a Dynamic, BGP Based, Highly-Available Site-to-Site VPN
The demo simulates a Hybrid AWS and On-premises environment - both using AWS.  

The demo consists of 5 stages, each implementing additional components of the architecture

- Stage 1 - Provision the environments
- Stage 2 - TGW VPN Attachments
- Stage 3 - IPSec Tunnel Configuration
- Stage 4 - BGP Routing and Testing
- Stage 5 - Cleanup

![end state architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE4%20-%20FINAL%20BGP%20Architecture.png)

## Instructions

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE1%20-%20AWS%20and%20ONPREM%20Setup.md)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE2%20-%20TGW%20VPN%20ATTACHMENTS.md)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/blob/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE3%20-%20IPSEC%20TUNNEL%20CONFIG.md)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/blob/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE4%20-%20BGP%20ROUTING%20AND%20TESTING.md)
- [Stage5](https://github.com/acantril/learn-cantrill-io-labs/blob/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE5%20-%20CLEANUP.md)

## 1-Click Installs
Make sure you are logged into AWS and in `us-east-1`  
Apply the template below and wait for `CREATE_COMPLETE` before continuing

- [BGPVPN](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-hybrid-bgpvpn/BGPVPNINFRA.yaml&stackName=BGPVPN)

## Architecture Diagrams

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/raw/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE1%20-%20Start%20Architecture.png)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/raw/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE2%20-%20Tunnel%20Architecture.png)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/raw/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE3%20-%20TUNNEL%20CONFIGURATION.png)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/raw/master/AWS_HYBRID_AdvancedVPN/02_INSTRUCTIONS/STAGE4%20-%20FINAL%20BGP%20Architecture.png)

