import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidV4, validate } from 'uuid';

import { returnError } from 'src/utils/returnError';
import { document } from '../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;
  if (!validate(userId)) {
    return returnError('User ID must be a valid uuid');
  }

  const response = await document.query({
    TableName: 'todos',
    IndexName: 'TodoByUserId',
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": {"S": userId},
    },
    ScanIndexForward: false,
    ProjectionExpression: 'title, done, deadline',
  }).promise();

  const todos = response.Items[0];

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
    headers: {
      "Content-Type": "application/json",
    }
  }
}