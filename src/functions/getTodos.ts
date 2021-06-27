import { APIGatewayProxyHandler } from 'aws-lambda';

export const handle: APIGatewayProxyHandler = async (event) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'ok',
    }),
    headers: {
      "Content-Type": "application/json",
    }
  }
}