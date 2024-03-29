// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

var AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
var DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
const TABLE_NAME = process.env.ACTIVE_CONNECTION_TABLE;

exports.handler = function (event, context, callback) {
  console.log(event);
  var putParams = {
    TableName: TABLE_NAME,
    Item: {
      connectionId: { S: event.requestContext.connectionId }
    }
  };

  DDB.putItem(putParams, function (err) {
    callback(null, {
      "statusCode": err ? 500 : 200,
      "body": err ? "Failed to connect: " + JSON.stringify(err) : "Connected"

    });
  });

};