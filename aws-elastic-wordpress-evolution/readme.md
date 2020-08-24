# Advanced Demo - Web App - Single Server to Elastic Evolution

In this advanced demo lesson you are going to evolve the architecture of a popular web application wordpress
The architecture will start with a manually built single instance, running the application and database
over the stages of the demo you will evolve this until its a scalable and resilient architecture

The demo consists of 7 stages, each implementing additional components of the architecture  

- Stage 1 - Setup the environment and manually build wordpress  
- Stage 2 - Automate the build using a Launch Template  
- Stage 3 - Split out the DB into RDS and Update the LT 
- Stage 4 - Split out the WP filesystem into EFS and Update the LT
- Stage 5 - Enable elasticity via a ASG & ALB and fix wordpress (hardcoded WPHOME)
- Stage 6a - Optional .. move to Aurora and DB HA  
- Stage 7 - Cleanup  

![Architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-elastic-wordpress-evolution/ArchitectureEvolution.png)

## Instructions

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE1%20-%20Setup%20and%20Manual%20wordpress%20build.md)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE2%20-%20Automate%20the%20build%20using%20a%20Launch%20Template.md)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE3%20-%20Add%20RDS%20and%20Update%20the%20LT.md)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE4%20-%20Add%20EFS%20and%20Update%20the%20LT.md)
- [Stage5](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE5%20-%20Add%20an%20ELB%20and%20ASG.md)
- [Stage6](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE6%20-%20Optional%20Aurora.md)
- [Stage7](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE7%20-%20CLEANUP.md)


## 1-Click Installs
Make sure you are logged into AWS and in `us-east-1`  

- [VPC](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-elastic-wordpress-evolution/A4LVPC.yaml&stackName=A4LVPC)

## Architecture Diagrams

- [Stage1 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE1%20-%20SINGLE%20SERVER%20MANUAL.png)
- [Stage1 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE1%20-%20SINGLE%20SERVER%20MANUAL.pdf)
- [Stage2 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE2%20-%20SINGLE%20SERVER%20LT.png)
- [Stage2 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE2%20-%20SINGLE%20SERVER%20LT.pdf)
- [Stage3 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE3%20-%20SPLIT%20OUT%20RDS.png)
- [Stage3 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE3%20-%20SPLIT%20OUT%20RDS.pdf)
- [Stage4 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE4%20-%20SPLIT%20OUT%20EFS.png)
- [Stage4 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE4%20-%20SPLIT%20OUT%20EFS.pdf)
- [Stage5 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE5%20-%20ASG%20%26%20ALB.png)
- [Stage5 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE5%20-%20ASG%20%26%20ALB.pdf)
- [Stage6 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE6%20-%203AZ%20Aurora%20Cluster.png)
- [Stage6 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-elastic-wordpress-evolution/02_LABINSTRUCTIONS/STAGE6%20-%203AZ%20Aurora%20Cluster.pdf)





