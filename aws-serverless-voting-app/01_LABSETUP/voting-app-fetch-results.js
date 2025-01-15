const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {

// Retrieve items from the table
const params = {
    TableName: "Voting_Table"
};

let scanResults = [];
let items;

do {
    items = await dynamo.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey  = items.LastEvaluatedKey;
} while(typeof items.LastEvaluatedKey != "undefined");


if (scanResults.length == 0) 
{
    console.log('No Items were found - ',scanResults.length);
    scanResults = [{ votecount: 0, vote_id: 'Cat-1'},{ votecount: 0, vote_id: 'Cat-2'},{ votecount: 0, vote_id: 'Cat-3'}];

    // Inserting Dummy Records
    console.log('Inserting Dummy Records');
    var obj1 = {
        'TableName': 'Voting_Table',
        'Item': {
          'vote_id': {
            S: 'Cat-1'
          },
          'votecount': {
            N: '0'
          }
        },
        'ReturnConsumedCapacity': "TOTAL"
    };
    var obj2 = {
        'TableName': 'Voting_Table',
        'Item': {
          'vote_id': {
            S: 'Cat-2'
          },
          'votecount': {
            N: '0'
          }
        },
        'ReturnConsumedCapacity': "TOTAL"
    };
    var obj3 = {
        'TableName': 'Voting_Table',
        'Item': {
          'vote_id': {
            S: 'Cat-3'
          },
          'votecount': {
            N: '0'
          }
        },
        'ReturnConsumedCapacity': "TOTAL"
    };
    
    try
    {
        var result1 = await ddb.putItem(obj1).promise();
        console.log(result1);
        console.log('Dummy Records added successfully');
    }
    catch(err1)
    {
        console.log('ERROR while adding Dummy Records');
        console.log(err1);
    }
    
    try
    {
        var result2 = await ddb.putItem(obj2).promise();
        console.log(result2);
        console.log('Dummy Records added successfully');
    }
    catch(err2)
    {
        console.log('ERROR while adding Dummy Records');
        console.log(err2);
    }
    
    try
    {
        var result3 = await ddb.putItem(obj3).promise();
        console.log(result3);
        console.log('Dummy Records added successfully');
    }
    catch(err3)
    {
        console.log('ERROR while adding Dummy Records');
        console.log(err3);
    }
}

/*
Access-Control-Allow-Origin

-> To allow only specific site to call this lambda function provide the hostname of your cloudfront or s3 webshite
-> For Example :- http://<S3-BUCKET-NAME>.s3-website-us-east-1.amazonaws.com
-> To try from localhost use this :- 'http://localhost:3000'
-> * will allow all origins to call this function and get response back.
*/	
return {
    statusCode: 200,
    body: JSON.stringify(scanResults),
    headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        }
};

};

