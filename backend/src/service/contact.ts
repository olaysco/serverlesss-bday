import { createLogger } from '@libs/logger'
import 'source-map-support/register'
import { v4 as uuidV4 } from 'uuid'
import { ContactAccess } from '../dataLayer/contactAccess'
import { Contact, ContactRequest, ContactUpdateRequest } from '../types'
import { HTTPException } from '@libs/exception'

const access = new ContactAccess()
const logger = createLogger('contactService')

const createManyContact = async (userId: string, contactRequest: ContactRequest[]) => {
    const contacts: Contact[] = contactRequest.map(c => {
        return {
            ...c,
            userId,
            id: uuidV4(),
            createdAt: new Date().toISOString(),
        }
    })
    await access.createManyContact(contacts)

    return contacts
}

//create
const createContact = async (userId: string, contactRequest: ContactRequest) => {
    const contact: Contact = {
        ...contactRequest,
        userId,
        id: uuidV4(),
        createdAt: new Date().toISOString(),
    }

    await access.createContact(contact)

    return contact
}

//read
const getContacts = async (userId: string): Promise<Contact[]> => {
    return await access.getAllContacts(userId)
}

//update
const updateContact = async (userId: string, id: string, contactUpdate: ContactUpdateRequest) => {
    const item = await access.getContact(userId, id)
    validateContact(userId, item)    

    return await access.updateContact(userId, id, contactUpdate)
}

//delete
const deleteContact = async (userId: string, id: string) => {
    const item = await access.getContact(userId, id)
    validateContact(userId, item)

    await access.deleteContact(userId, id)
    return true
}

const validateContact = (userId: string, item: any) => {
    if (!item) {
        logger.error(`attempt to access a contact that doesn't exist`)
        throw new HTTPException({message: 'Contact does not exist', code: 404})
    }

    if (item.userId !== userId) {
        logger.error(`unauthorized operation by ${userId} on contact ${item.id}`)
        throw new HTTPException({message: 'Unauthorized operation', code: 403})
    }

    return true
}

export {createContact, getContacts, updateContact, deleteContact, createManyContact}
