import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { addUserToContact, monthDayCelebrants } from 'src/service/contact';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import CelebrantQueue from "../../service/queue";
import { createLogger } from '@libs/logger';

const logger = createLogger('fetchDayCelebrants')

let celebrantQueue = new CelebrantQueue()

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const date = new Date()
  console.log(date.getMonth() + 1, date.getDate(), date.toISOString())
  let contacts = await monthDayCelebrants(date.getMonth() + 1, date.getDate())
  if (contacts.length > 0) {
    contacts = await addUserToContact(contacts)
    await celebrantQueue.pushCelebrantsToQueue(contacts)
    return formatJSONResponse({
      message: `contact successfully retrieved`,
      contacts
    });
  }

  return formatJSONResponse({
    message: `no celebrants today`,
    contacts
  });
  
}



export const main = middyfy(handler);
