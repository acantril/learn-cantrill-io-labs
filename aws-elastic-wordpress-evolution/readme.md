# Advanced Demo - Web App - Single Server to Elastic Evolution

In this advanced demo lesson you are going to evolve the architecture of a popular web application wordpress
The architecture will start with a manually built single instance, running the application and database
over the stages of the demo you will evolve this until its a scalable and resilient architecture

The demo consists of 7 stages, each implementing additional components of the architecture  

- Stage 1 - Setup the environment and manually build wordpress  
- Stage 2 - Automate the build using a Launch Template  
- Stage 3 - Add RDS and Update the LT 
- Stage 4 - Add an ASG  
- Stage 5 - Add EFS and update the LT  
- Stage 6 - Add an ALB and fix wordpress
- Stage 6a - Optional .. move to Aurora and DB HA  
- Stage 7 - Cleanup  

![Architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-elastic-wordpress-evolution/.png)

## Instructions

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE1%20-%20AWS%20and%20ONPREM%20Setup.md)


## 1-Click Installs
Make sure you are logged into AWS and in `us-east-1`  

- [HYBRIDDIR](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-hybrid-activedirectory/01_HYBRIDDIR.yaml&stackName=HYBRIDDIR)

## Architecture Diagrams

