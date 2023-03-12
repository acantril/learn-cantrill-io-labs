const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

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

