import type { AWS } from '@serverless/typescript';

import { postContact, updateContact, getContact, deleteContact, fetchDayCelebrants } from './src/functions';

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
      },
      models: [
        {
          name: "contactPostRequest",
          contentType: "application/json",
          schema: "${file(src/models/contactPostRequest.json)}"
        }
      ]
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
  plugins: ['serverless-webpack', 'serverless-iam-roles-per-function', 'serverless-reqvalidator-plugin', 'serverless-aws-documentation', 'serverless-dynamodb-local', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_XRAY_LOG_LEVEL: 'silent',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      USERS_TABLE: 'Users-${self:provider.stage}',
      CONTACT_TABLE: 'Users-contact-${self:provider.stage}',
      CONTACT_USER_INDEX: "contactUserIndex",
      CONTACT_BIRTHDAY_INDEX: "contactBdayIndex"
    },
    stage: "${opt:stage, 'dev'}",
    region: 'us-west-2',
    lambdaHashingVersion: '20201221',
    httpApi: {
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'PATCH'],
        maxAge: 3000,
        exposedResponseHeaders: ['Special-Response-Header'],
        allowCredentials: true
      },
      authorizers: {
        AuthO: {
          identitySource: "$request.header.Authorization",
          issuerUrl: "https://olaysco.us.auth0.com/",
          audience: [
            "https:://olaysco-bday-auth",
            "https:://olaysco-bday-auth"
          ]
        } 
      }
    }
  },
  functions: { postContact, getContact, updateContact, deleteContact, fetchDayCelebrants },
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
              AttributeName: "dateOfBirth",
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
              IndexName: "${self:provider.environment.CONTACT_BIRTHDAY_INDEX}",
              KeySchema: [
                {
                  AttributeName: "dateOfBirth",
                  KeyType: "HASH"
                },
                {
                  AttributeName: "userId",
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
      contactBody: {
        Type: "AWS::ApiGateway::RequestValidator",
        Properties: {
          Name: 'contact-body',
          RestApiId: {
            Ref: "ApiGatewayRestApi"
          },
          ValidateRequestBody: true,
          ValidateRequestParameters: false
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
