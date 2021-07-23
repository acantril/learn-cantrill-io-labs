# Advanced Demo - Migrating a database with the Database MIgration Service

In this advanced demo you will be migrating a simple web application (wordpress) from an on-premises environment into AWS.  
The on-premises environment is a virtual web server (simulated using EC2) and a self-managed mariaDB database server (also simulated via EC2)  
You will be migrating this into AWS and running the architecture on an EC2 webserver and RDS managed SQL database.  

Architecture Link : INSERT THE LINK HERE

This advanced demo consists of 5 stages :-

- STAGE 1 : Provision the environment and review tasks
- STAGE 2 : Establish Private Connectivity Between the environments (VPC Peer)
- STAGE 3 : Create & Configure the AWS Side infrastructure (App and DB)
- STAGE 4 : Migrate Database & Cutover
- STAGE 5 : Cleanup the account

![Architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-dms-database-migration/ArchitectureEvolutionAll.png)

## Instructions

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/STAGE1%20-%20Provision%20Environment%20and%20Review%20Architecture.md)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/STAGE2%20-%20Establish%20network%20connectivity.md)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/STAGE3%20-%20Create%20%26%20Configure%20the%20AWS%20Side%20infrastructure.md)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/STAGE4%20-%20Migrate%20Database%20%26%20Cutover.md)
- [Stage5](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/STAGE5%20-%20Cleanup.md)



## 1-Click Installs
Make sure you are logged into AWS and in `us-east-1`  

- [DMS](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://learn-cantrill-labs.s3.amazonaws.com/aws-dms-database-migration/DMS.yaml&stackName=DMS )

## Architecture Diagrams

- [Overall - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-OVERALL.png)
- [Overall - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-OVERALL.pdf)

- [Stage1 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE1.png)
- [Stage1 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE1.pdf)
- [Stage2 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE2.png)
- [Stage2 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE2.pdf)
- [Stage3 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE3.png)
- [Stage3 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE3.pdf)
- [Stage4 - PNG](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE4.png)
- [Stage4 - PDF](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-dms-database-migration/02_LABINSTRUCTIONS/ARCHITECTURE-STAGE4.pdf)







