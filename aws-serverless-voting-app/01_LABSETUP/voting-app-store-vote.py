import json
import boto3
import os

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    
    vote_id = str(event['queryStringParameters'].get('vote_id'))

    print('Vote Received For '+vote_id)
    
    ## Increment the vote count by 1
    
    response = client.update_item(
        Key={
        'vote_id': {
            'S': vote_id
        }},
    AttributeUpdates={
        'votecount': {
            'Value': {
                'N': '1',
            },
            'Action': 'ADD'
        }
    },
    ReturnConsumedCapacity='TOTAL',
    TableName='Voting_Table',
    )
    
    ## Access-Control-Allow-Origin
    
    ## To allow only specific site to call this lambda function provide the hostname of your cloudfront or s3 webshite
    ## For Example :- http://<S3-BUCKET-NAME>.s3-website-us-east-1.amazonaws.com
    ## To try from localhost use this :- 'http://localhost:3000'
    ## * will allow all origins to call this function and get response back.
 
    response = {
      'statusCode': 200,
      'body': json.dumps(vote_id),
      'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        }
    }
    print(response)
    return response
