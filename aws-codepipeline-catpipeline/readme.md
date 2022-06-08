# Advanced Demo - CodePipeline

In this demo series you're going to be implementing a full code pipeline incorportating commit, build and deploy steps.

The advanced demo consists of 5 stages :-

- STAGE 1 : Configure Security & Create a CodeCommit Repo
- STAGE 2 : Configure CodeBuild to clone the repo, create a container image and store on ECR
- STAGE 3 : Configure a CodePipeline with commit and build steps to automate build on commit.
- STAGE 4 : Create an ECS Cluster, TG's , ALB and configure the code pipeline for deployment to ECS Fargate
- STAGE 5 : CLEANUP

![Architecture](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/catpipeline-arch-all.png)

## Instructions

- [Stage1](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/STAGE1-CODECOMMIT.md)
- [Stage2](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/STAGE2-CODEBUILD.md)
- [Stage3](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/STAGE3-CODEPIPELINE.md)
- [Stage4](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/STAGE4-CODEDEPLOY.md)
- [Stage5](https://github.com/acantril/learn-cantrill-io-labs/blob/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/STAGE5-CLEANUP.md)



## 1-Click Installs
No installs required for this Advanced Demo

## Video Guides

- [Stage0](https://youtu.be/7phmk5-iBDo) - INTRO
- [Stage1](https://youtu.be/FmoXgFz4ODc)
- [Stage2-PART1](https://youtu.be/gOiV10FXgq0)
- [Stage2-PART2](https://youtu.be/g8TbqrNs4D0)
- [Stage3](https://youtu.be/GmnOW1UmXpA)
- [Stage4-PART1](https://youtu.be/ylY_yGHhVDk)
- [Stage4-PART2](https://youtu.be/xSdJiTRkqr4)
- [Stage5](https://youtu.be/JEsmwIPw25E)


## Architecture Diagrams

- [Stage1 - PNG](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/catpipeline-arch-stage1.png)
- [Stage1 - PDF](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/catpipeline-arch-stage1.pdf)
- [Stage2 - PNG](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/catpipeline-arch-stage2.png)
- [Stage2 - PDF](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/catpipeline-arch-stage2.pdf)
- [Stage3 - PNG](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/catpipeline-arch-stage3.png)
- [Stage3 - PDF](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/catpipeline-arch-stage3.pdf)
- [Stage4 - PNG](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/catpipeline-arch-stage4.png)
- [Stage4 - PDF](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/02_LABINSTRUCTIONS/catpipeline-arch-stage4.pdf)

