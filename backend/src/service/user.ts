import { createLogger } from '@libs/logger'
import { UserAccess } from '../dataLayer/userAccess'
import { User, UserUpdate } from '../types'

const access = new UserAccess()
const logger = createLogger('userService')


//create
const createUser = async (id: string) => {
    logger.info(`creating user ${id}`)
    const user: User = {id}

    await access.createUser(user)
    logger.info(`user created ${id}`)
    return user
}

//read
const getUser = async (id: string): Promise<User> => {
    logger.info(`getting user ${id}`)
    const user = await access.getUser(id)
    if (!user) {
       return await createUser(id)
    }
    return user
}

//batch read
const getUsers = async (ids: string[]): Promise<User[]> => {
    logger.info(`getting multiple users`)
    try {
        const users = await access.getUsers(ids)
        return users as User[]
    } catch (e) {
        logger.info('error getting multiple users')
    }
    
}

//update
const updateUser = async (id: string, userUpdate: UserUpdate) => {
    logger.info(`updating user ${id}`)
    getUser(id)
    logger.info(`user updated ${id}`)
    return await access.updateUser(id, userUpdate)
}

//update
const updateUserCard = async (id: string, userUpdate: UserUpdate) => {
    logger.info(`updating user ${id}`)
    getUser(id)
    logger.info(`user updated ${id}`)
    return await access.updateUserCard(id, userUpdate)
}




export {getUser, updateUser, updateUserCard, getUsers}
