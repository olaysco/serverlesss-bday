import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { getUserId, middyfy } from '@libs/lambda';

import schema from './schema';
import { updateContact } from 'src/service/contact';
import { ContactUpdateRequest } from 'src/types';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const contact: ContactUpdateRequest = event.body
  const updatedContact = await updateContact(getUserId(event), event.pathParameters.id, contact)
  return formatJSONResponse({
    message: `contact successfully created`,
    updatedContact,
  });
}

export const main = middyfy(handler);
