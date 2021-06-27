import { APIGatewayProxyHandler } from 'aws-lambda';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;
  if (!validate(userId)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'User ID must be a valid uuid',
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }
  }


  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'ok',
    }),
    headers: {
      "Content-Type": "application/json",
    }
  }
}