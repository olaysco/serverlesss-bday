import type { AWS } from '@serverless/typescript';

import { postContact, updateContact, getContact, deleteContact, fetchDayCelebrants, getUser, updateUser, sendEmail, postUserImage, authorizer } from './src/functions';

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
    },
    "serverless-offline-sqs": {
      autoCreate: true,
      endpoint: "http://localhost:9324",
      region: "eu-west-2",
      accessKeyId: "root",
      secretAccessKey: "root",
      skipCacheInvalidation: false
    },
    s3: {
      host: "localhost",
      port: "8200",
      directory: "/tmp"
    }
    
  },
  plugins: ['serverless-webpack', 'serverless-iam-roles-per-function', 'serverless-aws-documentation', 'serverless-dynamodb-local', 'serverless-s3-local', 'serverless-offline', 'serverless-offline-sqs'],
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
      CONTACT_BIRTHDAY_INDEX: "contactBdayIndex",
      CELEBRANT_QUEUE: "celebrantQueue",
      CARD_S3_BUCKET: "birthday-card-bucket-${self:provider.stage}",
      SIGNED_URL_EXPIRATION: "300",
      AUTH0_JWKS_URL: "https://olaysco.us.auth0.com/.well-known/jwks.json"
    },
    stage: "${opt:stage, 'dev'}",
    region: 'us-west-2',
    lambdaHashingVersion: '20201221',
    // httpApi: {
    //   cors: {
    //     allowedOrigins: ['*'],
    //     allowedHeaders: ['*'],
    //     allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'PATCH'],
    //     maxAge: 3000,
    //     exposedResponseHeaders: ['Special-Response-Header'],
    //     allowCredentials: true
    //   },
    //   authorizers: {
    //     AuthO: {
    //       identitySource: "$request.header.Authorization",
    //       issuerUrl: "https://olaysco.us.auth0.com/",
    //       audience: [
    //         "https:://olaysco-bday-auth",
    //         "https:://olaysco-bday-auth"
    //       ]
    //     } 
    //   }
    // },
    tracing: {
      lambda: true,
      apiGateway: true
    }
  },
  functions: {  authorizer, postContact, getContact, updateContact, deleteContact, fetchDayCelebrants, getUser, updateUser, sendEmail, postUserImage },
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
      },
      celebrantQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "${self:provider.environment.CELEBRANT_QUEUE}"
        }
      },
      CardBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:provider.environment.CARD_S3_BUCKET}",
          CorsConfiguration: {
            CorsRules: [
                {
                  AllowedOrigins: ['*'],
                  AllowedHeaders: ['*'],
                  AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
                  MaxAge: 3000
                }
              ]
            }
        }
      },
      BucketPolicy: {
        Type: "AWS::S3::BucketPolicy",
        Properties: {
          PolicyDocument: {
            Id: "MyPolicy",
            Version: "2012-10-17",
            Statement: [
              {
                Sid: "PublicReadForGetBucketObjects",
                Effect: "Allow",
                Principal: "*",
                Action: "s3:GetObject",
                Resource: "arn:aws:s3:::${self:provider.environment.CARD_S3_BUCKET}/*"
              }
            ]
          },
          Bucket: {
            Ref: "CardBucket"
          }
        }
      },
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
          },
          "ResponseType": "DEFAULT_4XX",
          RestApiId: {
            Ref: "ApiGatewayRestApi"
          }
        }
      }    
    }
  }
}

module.exports = serverlessConfiguration;
