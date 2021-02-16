import type { AWS } from '@serverless/typescript';

import { postContact, updateContact, getContact } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    documentation: {
      api: {
        info: {
          version: 'v1.0.0',
          title: '${self: service.name}',
          description: 'Wishes assistant application'
        }
      }
    },
    endpoints: {
      "dynamodb-url": "http://localhost:8000"
    },
    dynamodb: {
      start: {
        migrate: true
      },
      stages: ['dev']
    }
  },
  plugins: ['serverless-webpack', 'serverless-iam-roles-per-function', 'serverless-dynamodb-local', 'serverless-offline', 'serverless-aws-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      USERS_TABLE: 'Users-${self:provider.stage}',
      CONTACT_TABLE: 'Users-contact-${self:provider.stage}',
      CONTACT_USER_INDEX: "contactUserIndex"
    },
    stage: "${opt:stage, 'dev'}",
    region: 'us-west-2',
    lambdaHashingVersion: '20201221',
    httpApi: {
      authorizers: {
        AuthO: {
          identitySource: "$request.header.Authorization",
          issuerUrl: "olaysco.us.auth0.com",
          audience: [
            "https:://olaysco-bday-auth",
            "https:://olaysco-bday-auth"
          ]
        } 
      }
    }
  },
  functions: { postContact, getContact, updateContact },
  resources: {
    Resources: {
      UsersDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            }
          ],
          BillingMode: "PAY_PER_REQUEST",
          TableName: "${self:provider.environment.USERS_TABLE}"
        }
      },
      UsersContactDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            },
            {
              AttributeName: "userId",
              AttributeType: "S"
            },
            {
              AttributeName: "timestamp",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "userId",
              KeyType: "HASH"
            },
            {
              AttributeName: "id",
              KeyType: "RANGE"
            }
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "${self:provider.environment.CONTACT_USER_INDEX}",
              KeySchema: [
                {
                  AttributeName: "userId",
                  KeyType: "HASH"
                },
                {
                  AttributeName: "createdAt",
                  KeyType: "RANGE"
                }
              ],
              Projection: {
                ProjectionType: "ALL"
              }
            }
          ],
          BillingMode: "PAY_PER_REQUEST",
          TableName: "${self:provider.environment.CONTACT_TABLE}"
        }
      },
    }
  }
}

module.exports = serverlessConfiguration;
