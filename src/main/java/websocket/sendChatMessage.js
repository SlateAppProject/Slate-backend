//REFERENCE USED
// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0



const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const TABLE_NAME  = process.env.ACTIVE_CONNECTION_TABLE;

exports.handler = async (event, context) => {
  console.log({event})
  let connectionData;
  const roomId = JSON.parse(event.body).roomId;

  let params = {
    ExpressionAttributeValues: {
      ':name': roomId
    },
    FilterExpression: 'contains (roomId, :name)',
    TableName: TABLE_NAME
  }

  try {
    connectionData = await ddb.scan(params).promise();
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  // connectionData.Items.forEach(item => {console.log(item)});

  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });

  const postData = JSON.parse(event.body).data ;

  const postCalls = connectionData.Items.map(async ({ connectionId }) => {
    try {
      await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: event.body }).promise();
    } catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`);
        await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
      } else {
        throw e;
      }
    }
  });

  try {
    await Promise.all(postCalls);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200 };
};