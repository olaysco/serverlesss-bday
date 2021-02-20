export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      schedule: {
        enabled: true,
        rate: 'cron(0 1 * * ? *)'
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
        "dynamodb:GetItem",
        "dynamodb:Query"
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.CONTACT_TABLE}/index/${self:provider.environment.CONTACT_USER_INDEX}"
    },
    {
      Effect: "Allow",
      Action: [
          "sqs:GetQueueUrl",
          "sqs:ListQueues",
          "sqs:SendMessage"
      ],
      Resource: "arn:aws:sqs:${self:provider.region}:*:*"
    },
    {
      Effect: "Allow",
      Action: [
        "dynamodb:BatchGetItem"
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
    }
  ]
}