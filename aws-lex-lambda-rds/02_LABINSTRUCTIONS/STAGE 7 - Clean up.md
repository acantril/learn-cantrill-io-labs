# Lex-Lambda-RDS Demo

In this part of the DEMO, you will be cleaning up the resources you created.

# STAGE 7 - Clean up

Move the App Runner console: https://us-east-1.console.aws.amazon.com/apprunner/home?region=us-east-1

Click on the **"animal-grooming"** service. Then, click on the **"Actions"** button and select the **"Delete"** option. A pop-up window will appear. Type **"delete"** in the text box and click on the **"Delete"** button.

Navigate to the Lex V2 console: https://us-east-1.console.aws.amazon.com/lexv2/home?region=us-east-1

Select the **"AppointmentBot"** bot. Then, click on the **"Actions"** button and select the **"Delete"** option. A pop-up window will appear. Click on the **"Delete"** button.

Move to the RDS console: https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1

In the left-hand side menu, click on **"Databases"**.

Select the **"animal-grooming-db"** database. Then, click on the **"Actions"** button and select the **"Delete"** option.

A pop-up window will appear. Uncheck the **"Create a final snapshot?"** option. Uncheck the **"Retain automated backups"** option. Check the **"Acknowledge message"** option. Type **"delete me"** in the text box. Click on the **"Delete"** button.

Move the System Manager console: https://us-east-1.console.aws.amazon.com/systems-manager/home?region=us-east-1

In the left-hand side menu, click on **"Parameter Store"**.

Select the following parameters:

  - `/appointment-app/prod/db-url`
  - `/appointment-app/prod/db-user`
  - `/appointment-app/prod/db-password`
  - `/appointment-app/prod/db-database`

Then click on the **"Delete"** button in the top right corner of the page. A pop-up window will appear. Click on the **"Delete parameters"** button.

Move to the Lambda console: https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1

In the left-hand side menu, click on **"Functions"**.

Select the **"animal-grooming-function"** function. Then, click on the **"Actions"** button and select the **"Delete"** option. A pop-up window will appear. Type **"delete"** in the text box and click on the **"Delete"** button. Click on the **"Close"** button.

In the left-hand side menu, click on **"Layers"**.

Click on the **"animal-grooming-layer"** layer. Then, click on the **"Delete"** button in the top right corner of the page. A pop-up window will appear. Click on the **"Delete"** button.

Navigate to the ECR console: https://us-east-1.console.aws.amazon.com/ecr/home?region=us-east-1

In the left-hand side menu, click on **"Repositories"**.

Select the **"animal-grooming-repository"** repository. Then, click on the **"Delete"** button in the top right corner of the page. A pop-up window will appear. Type **"delete"** in the text box and click on the **"Delete"** button.

Navigate to the CloudFormation console: https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1

In the left-hand side menu, click on **"Stacks"**.

Select the stack created by the CloudFormation template. Then, click on the **"Delete"** button in the top right corner of the page. A pop-up window will appear. Click on the **"Delete stack"** button.
