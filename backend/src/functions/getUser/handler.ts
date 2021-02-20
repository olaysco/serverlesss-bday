import { formatJSONResponse } from '@libs/apiGateway';
import { getUserId, middyfy } from '@libs/lambda';
import { getUser } from 'src/service/user';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const user = await getUser(getUserId(event))
  return formatJSONResponse({
    message: `user successfully retrieved`,
    user,
  });
}

export const main = middyfy(handler);
