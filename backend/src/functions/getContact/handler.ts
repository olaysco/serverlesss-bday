import { formatJSONResponse } from '@libs/apiGateway';
import { getUserId, middyfy } from '@libs/lambda';
import { getContacts } from 'src/service/contact';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const contacts = await getContacts(getUserId(event))
  return formatJSONResponse({
    message: `contact successfully retrieved`,
    contacts,
  });
}

export const main = middyfy(handler);
