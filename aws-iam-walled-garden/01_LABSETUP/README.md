### HERE WILL BE LAB SETUP ASSETS

## Using AWS console

### Lab setup

![](images/01-create-stack.png)
![](images/02-select-template.png)
![](images/03-stack-name.png)
![](images/04-options.png)
![](images/05-review.png)
![](images/06-wait-for-complete.png)
![](images/07-outputs.png)
![](images/08-secrets-manager.png)
![](images/09-secret.png)
![](images/10-revealed.png)

### Lab cleanup

![](images/11-delete.png)

![](images/12-delete-progress.png)

## Using command line

### Lab setup

Deploy a cloudformation stack from `iamboundary.yaml` -template

```
$ STACK=walled-garden-lab
$ aws cloudformation deploy --stack-name ${STACK}  --template-file iamboundary.yaml --capabilities CAPABILITY_NAMED_IAM

Waiting for changeset to be created..
Waiting for stack create/update to complete
Successfully created/updated stack - walled-garden-lab
```

Get ARN for credentials stored in Secrets Manager

```
$ aws cloudformation describe-stacks --stack-name ${STACK} --query 'Stacks[].Outputs'
[
    [
        {
            "OutputKey": "Credentials",
            "OutputValue": "arn:aws:secretsmanager:eu-west-1:111111111111:secret:walled-garden-lab/user-WU6ORb",
            "Description": "IAM credentials stored in Secrets Manager"
        }
    ]
]
```

Note ARN from `OutputValue` and supply it as `--secret-id`

```
$ aws secretsmanager get-secret-value --query 'SecretString' --output text \
 --secret-id arn:aws:secretsmanager:eu-west-1:1111111111111:secret:walled-garden-lab/user-WU6ORb
{"password":"THIS-IS-YOUR-PASSWORD","username":"walled-garden-lab-user"}
```

Note `username` and `password` from above. Username is `${STACK}-user`.

### Lab cleanup

```
$ aws cloudformation delete-stack --stack-name ${STACK}
``` 

Wait for a moment and then verify stack has been deleted.

``` 
$ aws cloudformation describe-stacks --stack-name ${STACK}
An error occurred (ValidationError) when calling the DescribeStacks operation: Stack with id walled-garden-lab does not exist]
```
