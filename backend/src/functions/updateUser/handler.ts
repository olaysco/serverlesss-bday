import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { getUserId, middyfy } from '@libs/lambda';

import schema from './schema';
import { updateUser  } from 'src/service/user'
import { UserUpdate } from 'src/types';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const user: UserUpdate = event.body
  const updatedUser = await updateUser(getUserId(event), user)
  return formatJSONResponse({
    message: `contact successfully created`,
    updatedUser,
  });
}

export const main = middyfy(handler);
