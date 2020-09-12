import base64
import logging
import os
import json
import boto3
import urllib3
import uuid

logging.basicConfig()
log = logging.getLogger() 
log.setLevel(logging.INFO)


def lambda_handler(event, context):
    urls = []
    http = urllib3.PoolManager()
    
    for i in range(10):
        r = http.request('GET', 'http://thecatapi.com/api/images/get?size=medformat=src&type=png&api_key=8f7dc437-0b9b-47b8-a2c0-65925d593acf')
        with open('/mnt/efs/'+str(uuid.uuid1())+".png", "wb" ) as png:
            png.write(r.data)
    
        
    return {
        'statusCode': 200,
    }
