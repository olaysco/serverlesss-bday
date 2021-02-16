import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { getUserId, middyfy } from '@libs/lambda';

import schema from './schema';
import { createManyContact } from 'src/service/contact';
import { ContactRequest } from 'src/types';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const newContacts: ContactRequest[] = event.body as ContactRequest[]
  const contact = await createManyContact(getUserId(event),  newContacts)
  return formatJSONResponse({
    message: `contact successfully created`,
    contact,
  });
}

export const main = middyfy(handler);
