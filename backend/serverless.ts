import type { AWS } from '@serverless/typescript';

import { hello, postContact } from './src/functions';

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
      USERS_CONTACT_TABLE: 'Users-contact-${self:provider.stage}',
    },
    stage: "${opt:stage, 'dev'}",
    region: 'us-west-2',
    lambdaHashingVersion: '20201221',
  },
  functions: { hello, postContact }
}

module.exports = serverlessConfiguration;
