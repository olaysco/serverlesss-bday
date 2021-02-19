import { User, UserUpdate } from "../types"
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from "aws-sdk/clients/dynamodb"
import { createLogger } from "@libs/logger"

const logger = createLogger('userDataLAyer')
let XAWS = null
if (process.env._X_AMZN_TRACE_ID) {
    XAWS = AWSXRay.captureAWS(AWS)
} else {
    XAWS = AWS
}

export class UserAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly usersTable = process.env.USERS_TABLE,
    ) { }

    /**
     * Creates a user if doesn't exist
     * 
     * @param user User
     * @returns Promise<Contact>
     */
    async createUser(user: User): Promise<User> {
        await this.docClient.put({
            TableName: this.usersTable,
            Item: user
        }).promise()

        return user
    }
    
     /**
     * Updates a user
     * 
     * @param id string
     * @param user UserUpdate
     * @returns Promise<any>
     */
    async updateUser(id: string, user: UserUpdate): Promise<any> {
        const result = await this.docClient.update({
            TableName: this.usersTable,
            Key: {
                id
            },
            UpdateExpression: 'set messages = :messages',
            ExpressionAttributeValues: {
                ":messages": user.messages,
            },
            ReturnValues: "UPDATED_NEW"
        }).promise()
        if (!result.$response.error) {
            return result.$response.data
        }
        
        return result.$response.error.message
    }

    /**
     * Updates a user birthday card
     * 
     * @param id string
     * @param user UserUpdate
     * @returns Promise<any>
     */
    async updateUserCard(id: string, user: UserUpdate): Promise<any> {
        const result = await this.docClient.update({
            TableName: this.usersTable,
            Key: {
                id
            },
            UpdateExpression: 'set cardUrl = :cardUrl',
            ExpressionAttributeValues: {
                ":cardUrl": user.cardUrl,
            },
            ReturnValues: "UPDATED_NEW"
        }).promise()
        if (!result.$response.error) {
            return result.$response.data
        }
        
        return result.$response.error.message
    }

     /**
     * Asserts a contact item exists in DB
     * 
     * @param id string
     * @returns Promise<boolean>
     */
    async checkUserExists(id: string): Promise<boolean> {
        const user = await this.getUser(id);
        if (user) {
            return true
        }
        return false
    }

    /**
     * Retrieve a user by id
     * 
     * @param id string
     * @returns Promise<void>
     */
    async getUser(id: string): Promise<User> {
        const result = await this.docClient.get({
            TableName: this.usersTable,
            Key: {
                id
            }
        }).promise();
        logger.info(result)

        return result.Item as User
    }

    async getUsers(ids: string[]) {
        const Keys = [];
        ids.forEach(id => Keys.push({id}))
        let params = {
        RequestItems: { 
            [`${this.usersTable}`]: {
                Keys,
                AttributesToGet: [ 
                    'messages','id'
                ],
                ConsistentRead: false, 
            },
            },
            ReturnConsumedCapacity: 'NONE',
        };
        const response = await this.docClient.batchGet(params).promise();
        return response.Responses[`${this.usersTable}`]
    }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  logger.info('Creating a cloud DynamoDB instance')
  return new XAWS.DynamoDB.DocumentClient()
}