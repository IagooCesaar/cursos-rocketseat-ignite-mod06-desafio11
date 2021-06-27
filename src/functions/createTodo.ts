import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidV4, validate } from 'uuid'

interface ICreateTodo {
  title: string;
  deadline: string;
}

const returnError = (statusCode: number, errorMessage: string): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify({
      error: errorMessage,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  }
}


export const handle: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;
  if (!validate(userId)) {
    return returnError(400, 'User ID must be a valid uuid');
  }

  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
  if (!title) {
    return returnError(400, 'Title must be provided');
  }
  if (!deadline) {
    return returnError(400, 'Deadline must be provided');
  }
  
  const id = uuidV4();


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