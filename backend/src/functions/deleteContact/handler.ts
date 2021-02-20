import { formatJSONResponse } from '@libs/apiGateway';
import { getUserId, middyfy } from '@libs/lambda';
import { deleteContact } from 'src/service/contact';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const contacts = await deleteContact(getUserId(event), event.pathParameters.id)
  return formatJSONResponse({
    message: `contact successfully deleted`,
    contacts,
  });
}

export const main = middyfy(handler);
