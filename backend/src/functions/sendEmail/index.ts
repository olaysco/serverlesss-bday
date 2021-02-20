export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      sqs: {
        QueueName: "${self:provider.environment.CELEBRANT_QUEUE}",
        arn: {
          "Fn::GetAtt": [
            "${self:provider.environment.CELEBRANT_QUEUE}",
            "Arn"
         ]
        }
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
          "sqs:GetQueueUrl",
          "sqs:ListQueues",
          "sqs:ReceiveMessage"
      ],
      Resource: "arn:aws:sqs:${self:provider.region}:*:*"
    },
    {
      Effect: "Allow",
      Action: [
        "dynamodb:GetItem",
        "dynamodb:PutItem"
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
    }
  ]
}
