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
        const signedUrl = await storage.signUrl(attachmentId)
        const cardUrl = await storage.getUrl(attachmentId)
        await updateUserCard(getUserId(event), {cardUrl})
        return formatJSONResponse({
            message: `user successfully retrieved`,
            signedUrl,
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
