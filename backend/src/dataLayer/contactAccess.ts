import { Contact, ContactUpdate } from "../types"
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from "aws-sdk/clients/dynamodb"
import { createLogger } from "@libs/logger"

const logger = createLogger('contactDataLAyer')

const XAWS = AWSXRay.captureAWS(AWS)

export class ContactAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly contactsTable = process.env.CONTACT_TABLE,
        private readonly contactUserIndex = process.env.CONTACTS_USER_INDEX
    ) { }

    /**
     * Creates a contact item
     * 
     * @param contact Contact
     * @returns Promise<Contact>
     */
    async createContact(contact: Contact): Promise<Contact> {
        await this.docClient.put({
            TableName: this.contactsTable,
            Item: contact
        }).promise()

        return contact
    }

    /**
     * Creates multiple contact items in a single write operation
     * 
     * @param contacts Contact
     * @returns Promise<Contact>
     */
    async createManyContact(contacts: Contact[]): Promise<Contact[]> {
        const params: Array<Record<string, {}>> = [];
        contacts.forEach(contact => {
            params.push({
                PutRequest: {
                    Item: {
                        id: contact.id,
                        userId: contact.userId,
                        name: contact.name,
                        email: contact.email,
                        title: contact.title,
                        dayOfBirth: contact.dayOfBirth,
                        monthOfBirth: contact.monthOfbirth
                    }
                }
            })
        })
        await this.docClient.batchWrite({
            RequestItems: {
                'TABLE_NAME': params
            }
        }).promise()

        return contacts
    }
    
     /**
     * Updates a contact item
     * 
     * @param id string
     * @param contact ContactUpdate
     * @returns Promise<any>
     */
    async updateContact(userId: string, id: string, contact: ContactUpdate): Promise<any> {
        const result = await this.docClient.update({
            TableName: this.contactsTable,
            Key: {
                userId,
                id
            },
            UpdateExpression: 'set #name = :name, email = :email, title = :title, monthOfBirth = :monthOfBirth, dayOfBirth = :dayOfBirth',
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ExpressionAttributeValues: {
                ":name": contact.name,
                ":email": contact.email,
                ":title": contact.title,
                ":monthOfBirth": contact.monthOfbirth,
                ":dayOfBirth": contact.dayOfBirth
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
    async checkContactExists(userId, id: string): Promise<boolean> {
        const contact = await this.getContact(userId, id);
        if (contact) {
            return true
        }
        return false
    }
    
    /**
     * Retrieves all contacts for an account
     * 
     * @param userId string
     * @returns Promise<Contact[]>
     */
    async getAllContacts(userId: string): Promise<Contact[]> {
        const result = await this.docClient.query({
            TableName: this.contactsTable,
            IndexName: this.contactUserIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        return result.Items as Contact[]
    }

    /**
     * Retrieve a contact by id
     * 
     * @param id string
     * @returns Promise<void>
     */
    async getContact(userId: string, id: string): Promise<Contact> {
        const result = await this.docClient.get({
            TableName: this.contactsTable,
            Key: {
                userId,
                id
            }
        }).promise();

        return result.Item as Contact
    }

    /**
     * Deletes a todo item
     * 
     * @param id string
     * @returns Promise<void>
     */
    async deleteContact(userId: string, id: string): Promise<void> {
        logger.info(`begin: deleting todo ${id} `)
        this.docClient.delete({
            TableName: this.contactsTable,
            Key: {
                userId,
                id
            }
        }).promise()
        logger.info(`end: delete todo ${id} `)
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