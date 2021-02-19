
import * as AWS from 'aws-sdk'
import { createLogger } from "@libs/logger"
import * as AWSXRay from 'aws-xray-sdk'
import { Contact } from 'src/types'

const logger = createLogger('queueLog')
let XAWS = null
if (process.env._X_AMZN_TRACE_ID) {
    XAWS = AWSXRay.captureAWS(AWS)
} else {
    XAWS = AWS
}

const ERROR_QUEUE_NONEXISTENCE = "AWS.SimpleQueueService.NonExistentQueue"

export default class CelebrantQueue {
    constructor(
        private readonly celebrantQueue = process.env.CELEBRANT_QUEUE,
        private readonly sqsClient: AWS.SQS = createSQSClient()
    ) { }

    async getQueueUrlOrCreate(queueName: string): Promise<string> {
        let params = {QueueName: queueName};
        try {
            const queue = await this.sqsClient.getQueueUrl(params).promise()
            return queue.QueueUrl
        } catch (e) {
            if (e.code === ERROR_QUEUE_NONEXISTENCE) {
               return await this.createQueue(queueName)
            }
        }
    }

    async createQueue(queueName: string): Promise<string> {
        let params = {QueueName: queueName};
        try {
            const queue = await this.sqsClient.createQueue(params).promise()
            return queue.QueueUrl
        } catch (error) {
            logger.error("error creating queue")
        }
    }

    /**
     * Sends Birthday celebrant to queue for future processing
     * @param contacts 
     */
    async pushCelebrantsToQueue(contacts: Contact[]) {
        const queueUrl = await this.getQueueUrlOrCreate(this.celebrantQueue)
        let params = { QueueUrl: queueUrl, MessageBody: "" };
        await contacts.forEach(async contact => {
            let queueParam = { ...params, MessageBody: JSON.stringify(contact) };
            try {
                const qw = await this.sqsClient.sendMessage(queueParam).promise()
            } catch (e) {
                logger.error(e)
            }
        })
    }
}

function createSQSClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local SQS instance')
    return new XAWS.SQS({ apiVersion: '2012-11-05', endpoint: "http://localhost:9324" });
  }

  logger.info('Creating a cloud SQS instance')
  return new XAWS.SQS({ apiVersion: '2012-11-05' });
}
