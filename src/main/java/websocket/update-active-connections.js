// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

var AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
var DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
const TABLE_NAME = process.env.ACTIVE_CONNECTION_TABLE;

exports.handler = function (event, context) {
  console.log(event);
  var putParams = {
    TableName: TABLE_NAME,
    Item: {
      connectionId: { S: event.requestContext.connectionId },
      roomId: {S : JSON.parse(event.body).roomId}
    }
  };

  DDB.putItem(putParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};