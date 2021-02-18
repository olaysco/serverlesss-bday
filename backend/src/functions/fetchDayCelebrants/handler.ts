import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { monthDayCelebrants } from 'src/service/contact';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const date = new Date()
  console.log(date.getMonth() + 1, date.getDate(), date.toISOString())
  const contacts = await monthDayCelebrants(date.getMonth() + 1, date.getDate())
  return formatJSONResponse({
    message: `contact successfully retrieved`,
    contacts,
  });
}

export const main = middyfy(handler);
