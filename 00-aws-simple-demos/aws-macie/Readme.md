# Using Macie to scan S3 for PII

# Overview

We’re going to create some fake PII (Personally Identifiable Information) in an S3 bucket, set up Amazon Macie to find and report that data, and alert us via EventBridge and SNS.

I will be creating this in the ap-southeast-2 region, so all links to the console will be there. Make sure you change region if you’re deploying elsewhere.

Macie is free for 30 days, so as long as you disable Macie before then, you won’t pay anything.

# Example Data

************************Credit cards - cc.txt************************

```python
American Express
5135725008183484 09/26
CVE: 550

American Express
347965534580275 05/24
CCV: 4758

Mastercard
5105105105105100
Exp: 01/27
Security code: 912
```

****************************************Employee information - employees.txt****************************************

```python
74323 Julie Field
Lake Joshuamouth, OR 30055-3905
1-196-191-4438x974
53001 Paul Union
New John, HI 94740
Amanda Wells

354-70-6172
242 George Plaza
East Lawrencefurt, VA 37287-7620
GB73WAUS0628038988364
587 Silva Village
Pearsonburgh, NM 11616-7231
LDNM1948227117807
Brett Garza
```

************************************Access credentials - keys.txt************************************

```python
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_SESSION_TOKEN=AQoDYXdzEPT//////////wEXAMPLEtc764bNrC9SAPBSM22wDOk4x4HIZ8j4FZTwdQWLWsKWHGBuFqwAeMicRXmxfpSPfIeoIYRqTflfKD8YUuwthAx7mSEI/qkPpKPi/kMcGdQrmGdeehM4IC1NtBmUpp2wUE8phUZampKsburEDy0KPkyQDYwT7WZ0wq5VSXDvp75YU9HFvlRd8Tx6q6fE8YQcHNVXAkiY9q6d+xo0rKwT38xVqr7ZD0u0iPPkUL64lIZbqBAz+scqKmlzm8FDrypNC9Yjc8fPOLn9FX9KSYvKTr4rvx3iSIlTJabIQwj2ICCR/oLxBA==
github_key: c8a2f31d8daeb219f623f484f1d0fa73ae6b4b5a
github_api_key: c8a2f31d8daeb219f623f484f1d0fa73ae6b4b5a
github_secret: c8a2f31d8daeb219f623f484f1d0fa73ae6b4b5a
```

****************Custom data (Australian licence plates) - plates.txt****************

```python
# Victoria
1BE8BE
ABC123
DEF-456

# New South Wales
AO31BE
AO-15-EB
BU-60-UB

# Queensland
123ABC
000ZZZ
987-YXW
```

# Instructions

## Stage 1 - Add the example data to S3

Save the above examples as different text files on your PC, then head to the S3 console: https://s3.console.aws.amazon.com/s3/buckets

Create a new bucket by clicking <kbd>Create bucket</kbd>

Select any name you like and the region you’re using, leave all other options as default, and click <kbd>Create bucket</kbd>

**********Note:********** The region you select for the bucket, needs to be the same region you set Macie up in.

Upload the above files to the S3 bucket you just created, either directly to the root of the bucket, or to a subdirectory you created.

Optional: To upload these files via the command line to random subdirectories, you can use the following command (you need to set up [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) if you’re wanting to do this):

```python
❯ ls -1 *.txt
cc.txt
employees.txt
keys.txt
plates.txt

❯ for x in $(ls -1 *.txt); do aws s3 cp ${x} s3://BUCKET_NAME/$RANDOM/$RANDOM/$RANDOM/${x}; done
upload: ./cc.txt to s3://BUCKET_NAME/1340/7073/9841/cc.txt
upload: ./employees.txt to s3://BUCKET_NAME/15772/21602/11992/employees.txt
upload: ./keys.txt to s3://BUCKET_NAME/26039/27331/32227/keys.txt
upload: ./plates.txt to s3://BUCKET_NAME/14373/22304/25075/plates.txt
```

## Stage 2 - Enable Amazon Macie

Head to the Macie console:  [https://ap-southeast-2.console.aws.amazon.com/macie/home?region=ap-southeast-2#getStarted](https://ap-southeast-2.console.aws.amazon.com/macie/home?region=ap-southeast-2#getStarted)

The first screen you see after clicking <kbd>Getting started</kbd> should be an introduction to Macie, including the service-linked role AWS will create for Macie to use, to scan S3 buckets.

Click <kbd>Enable Macie</kbd>

Once enabled, you might need to wait a couple of minutes, and refresh a few times until Macie is ready and you see this screen.

![Untitled](images/Untitled.png)

Go to the “S3 Buckets” section, tick the bucket you have created and added files to, and then click <kbd>Create job</kbd>

![Untitled](images/Untitled%201.png)

On the “Review S3 buckets” page, click <kbd>Next</kbd>

On the "Refine the scope” page, select “One-time job” and click <kbd>Next</kbd>

Leave “Managed data identifier options” on “All” and click <kbd>Next</kbd>

We don’t have any “Custom data identifiers” yet, so click <kbd>Next</kbd>

On the “Select allow lists” page, click <kbd>Next</kbd>

Set the “Job name” to anything you like and click <kbd>Next</kbd>

Confirm everything looks good, then click <kbd>Confirm</kbd>

It might take up to 20 minutes to complete, but once it’s done you can click on <kbd>Show results</kbd> then <kbd>Show findings</kbd>

![Untitled](images/Untitled%202.png)

You should see the Credit Card, Employee, and Financial files have been found as having PII.

## Stage 3 - Setting up SNS

Head to the SNS console: [https://ap-southeast-2.console.aws.amazon.com/sns/v3/home?region=ap-southeast-2#/topics](https://ap-southeast-2.console.aws.amazon.com/sns/v3/home?region=ap-southeast-2#/topics)

Click on <kbd>Create topic</kbd>

Set the ********Type******** to “Standard”

Set the ********Name******** to be “Macie-Alerts”

Under **************************Access policy**************************, leave the ************Method************ as “Basic”

Change **Define who can publish messages to the topic** to “Only the specified AWS accounts” and enter your account ID (found in the top right of the screen)

Change **Define who can subscribe to this topic** to “Only the specified AWS accounts” and enter your account ID again

***********In the real world, this should be locked down further to only the resources you want publishing to the topic, but in this temporary example set up, locking down to just the account is fine and safe enough***********

Leave all other options as default

Click on <kbd>Create topic</kbd>

On the next page, click on <kbd>Create subscription</kbd>

Change the ****************Protocol**************** to “Email”

In the ****************Endpoint**************** field, enter your personal email

Click <kbd>Create subscription</kbd>

You will receive a confirmation email shortly after, with a link you need to click on. This tells SNS that you’re happy to receive emails from the topic, and prevents spam from being sent via SNS.

******************Side note: While writing this, my confirmation went to Spam in Gmail, so don’t forget to check there.******************

Your subscription should now be in the Confirmed state:

![Untitled](images/Untitled%203.png)

## Stage 4 - Setting up EventBridge

Head to the EventBridge console: [https://ap-southeast-2.console.aws.amazon.com/events/home?region=ap-southeast-2#/](https://ap-southeast-2.console.aws.amazon.com/events/home?region=ap-southeast-2#/)

Make sure “EventBridge Rule” is selected and click <kbd>Create rule</kbd>

![Untitled](images/Untitled%204.png)

On the next page, set the “Name” to “macie-events”, leave everything else as default, and click <kbd>Next</kbd>

On the next page, scroll down to “Event pattern” and select “Use pattern form”.

Change “AWS Service” to “Macie”, and “Event Type” to “Macie Finding”

![Untitled](images/Untitled%205.png)

Click <kbd>Next</kbd>

On the next page, set the Target Type to “AWS service” and then “SNS”, and select your created SNS Topic.

![Untitled](images/Untitled%206.png)

Click <kbd>Next</kbd>

On the tags page, add any tags you like (if any), then click <kbd>Next</kbd>

On the final page, click on <kbd>Create rule</kbd>

## Stage 5 - Adding a custom Macie data identifier

Head to the Macie console:  [https://ap-southeast-2.console.aws.amazon.com/macie/home?region=ap-southeast-2#summary](https://ap-southeast-2.console.aws.amazon.com/macie/home?region=ap-southeast-2#summary)

Go to the “Custom data identifiers” page and click <kbd>Create</kbd>

Set the Name to “LicencePlates”

Set the Regular Expression to:

```python
([0-9][a-zA-Z][a-zA-Z]-?[0-9][a-zA-Z][a-zA-Z])|([a-zA-Z][a-zA-Z][a-zA-Z]-?[0-9][0-9][0-9])|([a-zA-Z][a-zA-Z]-?[0-9][0-9]-?[a-zA-Z][a-zA-Z])|([0-9][0-9][0-9]-?[a-zA-Z][a-zA-Z][a-zA-Z])|([0-9][0-9][0-9]-?[0-9][a-zA-Z][a-zA-Z])
```

This is a very basic regular expression that will pick up the licence plate formats in the example file above. 

Leave everything else as default and click <kbd>Submit</kbd>

## Stage 6 - Starting a new job

Head to the Macie console:  [https://ap-southeast-2.console.aws.amazon.com/macie/home?region=ap-southeast-2#summary](https://ap-southeast-2.console.aws.amazon.com/macie/home?region=ap-southeast-2#summary)

Go to the “S3 Buckets” section, tick the bucket you have created and added files to, and then click <kbd>Create job</kbd>

![Untitled](images/Untitled%201.png)

On the “Review S3 buckets” page, click <kbd>Next</kbd>

On the "Refine the scope” page, select “One-time job” and click <kbd>Next</kbd>

Leave “Managed data identifier options” on “All” and click <kbd>Next</kbd>

On the “Custom data identifiers” page, select “LicencePlates” identifier you created and click <kbd>Next</kbd>

![Untitled](images/Untitled%207.png)

On the “Select allow lists” page, click <kbd>Next</kbd>

Set the “Job name” to anything you like and click <kbd>Next</kbd>

Confirm everything looks good, then click <kbd>Confirm</kbd>

After a few minutes, you should receive a few very ugly looking emails. They are JSON outputs of the Macie findings, including the custom data identifier we just created.

![Untitled](images/Untitled%208.png)

It might take up to 20 minutes to complete, but once it’s done you can click on <kbd>Show results</kbd> then <kbd>Show findings</kbd>

![Untitled](images/Untitled%202.png)

If you click on the custom identifier finding, you should see that it found 9 Licence Plates in our plates.txt file

![Untitled](images/Untitled%209.png)

## Stage 7 - Clean up

Head to the SNS console: [https://ap-southeast-2.console.aws.amazon.com/sns/v3/home?region=ap-southeast-2#/topics](https://ap-southeast-2.console.aws.amazon.com/sns/v3/home?region=ap-southeast-2#/topics)

Select your Topic and click <kbd>Delete</kbd>

Type “delete me” into the confirmation field, and click <kbd>Delete</kbd>

Now go to the Subscriptions page, select your subscription, click <kbd>Delete</kbd>, and then <kbd>Delete</kbd>

Head to the Macie console:  [https://ap-southeast-2.console.aws.amazon.com/macie/home?region=ap-southeast-2#summary](https://ap-southeast-2.console.aws.amazon.com/macie/home?region=ap-southeast-2#summary)

Go to Settings, and scroll to the end of the page, where there will be a <kbd>Disable Macie</kbd> button. Click on that, type “Disable” in the confirmation box, and click <kbd>Disable Macie</kbd>.

![Untitled](images/Untitled%2010.png)

Head to the EventBridge console: [https://ap-southeast-2.console.aws.amazon.com/events/home?region=ap-southeast-2#/rules](https://ap-southeast-2.console.aws.amazon.com/events/home?region=ap-southeast-2#/rules)

Go to the Rules page, select the rule we created earlier, and click <kbd>Delete</kbd>

![Untitled](images/Untitled%2011.png)

Type the name of the rule in the confirmation box, and click <kbd>Delete</kbd>

Head to the S3 console: [https://s3.console.aws.amazon.com/s3/buckets?region=ap-southeast-2&region=ap-southeast-2](https://s3.console.aws.amazon.com/s3/buckets?region=ap-southeast-2&region=ap-southeast-2)

Select your source bucket, and click <kbd>Empty</kbd>

Enter “*permanently delete”* in the confirmation window, and click <kbd>Empty</kbd>

Then, select your source bucket, and click <kbd>Delete</kbd>

Enter the bucket name in the confirmation window, and click <kbd>Delete</kbd>