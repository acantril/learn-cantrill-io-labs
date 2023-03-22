# Lex-Lambda-RDS Demo

To complete this stage, you will need to have the CloudFormation stack deployed. If you have not done it yet, please follow the section `1-Click Install` in the [README](../README.md) file.

In this part of the DEMO, you will be doing the following:

- Creating a Lex bot that will be used to interact with the user

- Configure the Lex bot to use the Lambda function that was created in the previous stage

# STAGE 4 - Create and configure the Lex Bot

## STAGE 4A - Create the Lex bot

Navigate to the Lex V2 console: https://us-east-1.console.aws.amazon.com/lexv2/home?region=us-east-1#welcome

Click on **"Create bot"** button.

In the creation method section, select **"Create a blank bot"**.

In the **"Bot configuration"** section, enter the following values:

- **"Bot name"**: `AppointmentBot`

In the **"IAM permissions"** section, select **"Use an existing role"** and select the role that was created by the CloudFormation stack. It will have a name with the following format: `<Stack Name>-LexV2Role-<Random String>`.

In the **"Children’s Online Privacy Protection Act (COPPA)"** section, select **"No"**.

Click the **"Next"** button.

Leave the rest of the settings as they are and click the **"Done"** button.

You will be redirect to a page where you can configure the **"Intents"** and **"Slots"** of the bot.

## STAGE 4B - Configure the Lex bot

In the **"Intent details"** section, change the **"Intent name"** to `BookAppointment`.

In the **"Sample utterances"** section, enter the following values and click the **"Add utterance"** button per each value (do not remove the curly braces of the values):

 - `Book an appointment`
 - `I want to make a animal grooming reservation`
 - `Book an appointment in the animal grooming salon`
 - `I want to make an appointment for {AnimalName}`
 - `Schedule a grooming session for my pet`
 - `I need to make an appointment for pet grooming on {ReservationDate}`
 - `I want to book a pet grooming appointment for {AnimalName} on {ReservationDate} at {ReservationTime}`
 - `I'd like to make an appointment for my {AnimalType} at {ReservationTime}`
 - `I need to schedule a grooming session for my {AnimalType} on {ReservationDate} at {ReservationTime}`
 - `I want to make a pet grooming reservation for {AnimalName} at {ReservationTime} on {ReservationDate}`

Once you have added all the utterances, click the **"Save intent"** button located at the bottom-right corner of the page.

In the left-hand side menu, click on **"Back to intents list"**. Then, click on the **"Slot types"** option.

Click on the **"Add slot type"** button and then click on the **"Add blank slot type"** option.

A pop-up window will appear. Enter **"AnimalType"** as the **"Slot type name"** and click the **"Add"** button.

In the **"Slot type values"** section, enter the following values and click the **"Add value"** button per each value:

 - `dog`
 - `cat`
 - `bird`
 - `fish`
 - `chicken`
 - `crocodile`

Once you have added all the values, click the **"Save Slot type"** button located at the bottom-right corner of the page.

In the left-hand side menu, click on **"Slot types"**. Then, click on the **"Intents"** option.

Click on the **"BookAppointment"** intent.

In the **"Slots"** section, click on the **"Add slot"** button.

A pop-up window will appear. Enter the following values:

  - **"Required for this intent"**: `Check the box`
  - **"Name"**: `AnimalName`
  - **"Slot type"**: `AMAZON.AlphaNumeric`
  - **"Prompt"**: `What is the name of your pet?`

Click the **"Add"** button.

Repeat the previous step to add a new slot with the following values:

  - **"Required for this intent"**: `Check the box`
  - **"Name"**: `AnimalType`
  - **"Slot type"**: `AnimalType`
  - **"Prompt"**: `What type of pet is {AnimalName}?`

Click the **"Add"** button.

Repeat the previous step to add a new slot with the following values:

  - **"Required for this intent"**: `Check the box`
  - **"Name"**: `ReservationDate`
  - **"Slot type"**: `AMAZON.Date`
  - **"Prompt"**: `What date would you like to make the appointment?`

Click the **"Add"** button.

Repeat the previous step to add a new slot with the following values:

  - **"Required for this intent"**: `Check the box`
  - **"Name"**: `ReservationTime`
  - **"Slot type"**: `AMAZON.Time`
  - **"Prompt"**: `What time would you like to make the appointment?`

Click the **"Add"** button.

Next move to the **"Confirmation"** section, click on the **"Prompts to confirm the intent"** to expand the section and enter the following values:

  - **"Confirmation prompt"**: `Ok, I will book an appointment for {AnimalName} on {ReservationDate} at {ReservationTime}. Does this sound good?`
  - **"Decline response"**: `No worries, I will not book the appointment.`

Make sure the **"Active"** switch is turned on in the top-right corner of the section.

Next move to the **"Fullfillment"** section and enable the **"Active"** switch in the top-right corner of the section.

Next move to the **"Code hook"** section and check the **"Use a Lambda function for initialization and validation"** option.

Click the **"Save intent"** button located at the bottom-right corner of the page.

In the left-hand side menu, click on **"Back to intents list"**. Then, click on the **"Aliases"** option.

Click on the unique alias available in the list.

In the **"Languages"** section, click on **"English (US)"** language.

In the **"Source"** dropdown menu, select the Lambda function that was created in the previous stage, **"animal-grooming-function"**.

Click on the **"Save"** button.

In the left-hand side menu, click on the **"Intents"** option.

Click on the **"FallbackIntent"** intent.

In the **"Closing response"** section click on **"Response sent to the user after the intent is fulfilled"** to expand the section. Then, enter the following value in the **"Message"** field:

  - **"Message"**: `Sorry, I did not understand you. Would you mind to repeat it with different words?`

Click on the **"Save intent"** button located at the bottom-right corner of the page.

In the left-hand side menu, click on **"Back to intents list"**.

Now we need to build the bot. Click on the **"Build"** button located at the top-right corner of the page.

Lastly, we need to add a resource-based policy to the Lambda function that was created in the previous stage so the Lex bot can invoke it. To do so, we will need to find the bot ID.

In the left-hand side menu, click on the name of the Lex bot (**"AppointmentBot"**). You will see the bot ID the **"Bot details"** section. Copy the ID to the clipboard.

Navigate to the Lambda function console: https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions

Click on the **"animal-grooming-function"** function.

Click on the **"Configuration"** tab.

Select the **"Permissions"** option in the left-hand side menu.

In the **"Resource-based policy statements"** section, click on the **"Add permissions"** button.

Select the **"AWS service"** option and use the following values:

  - **"Service"**: `Other`
  - **"Statement ID"**: `lex-bot-resource-policy`
  - **"Principal"**: `lexv2.amazonaws.com`
  - **"Source ARN"**: `arn:aws:lex:us-east-1:<AWS Account ID>:bot-alias/<BOT ID>/TSTALIASID`
  - **"Actions"**: `lambda:InvokeFunction`

Where `<AWS Account ID>` is your AWS account ID and `<BOT ID>` is the ID of the Lex bot that you copied to the clipboard in the previous step.

Click on the **"Save"** button.