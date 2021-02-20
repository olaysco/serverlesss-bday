import {  CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'

import { verify } from 'jsonwebtoken'
import { createLogger } from '@libs/logger'
import { authorizer } from 'src/service/auth'
import { JwtPayload } from 'src/types'
import { middyfy } from '@libs/lambda'

const logger = createLogger('auth')

const jwksUrl = process.env.AUTH0_JWKS_URL

const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
    logger.info('Authorizing a user', event.authorizationToken)
    try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })
        console.log(e)
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  // const jwt: Jwt = decode(token, { complete: true }) as Jwt
  const secret = await authorizer(jwksUrl);
  
  return verify(token, secret, { algorithms: ['RS256'] }) as  JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

export const main = middyfy(handler);
