import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { getUserId, middyfy } from '@libs/lambda';
import { v4 as uuidV4 } from 'uuid'
import Storage from '../../service/s3'
import { updateUserCard } from "../../service/user"
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

const storage = new Storage()

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {

    const attachmentId = uuidV4()
    try {
        const cardUrl = await storage.signUrl(attachmentId)
        await updateUserCard(getUserId(event), {cardUrl: cardUrl})
        return formatJSONResponse({
            message: `user successfully retrieved`,
            cardUrl,
        });
    } catch (e) {
        console.log(e)
        return formatJSONResponse({
            message: `error`,
            reason: "error while signing url"
        }, 500);
    }

}

export const main = middyfy(handler);
