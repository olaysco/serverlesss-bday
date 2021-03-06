
export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: '/user',
        authorizer: "authorizer",
        cors: true
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [   
        "dynamodb:UpdateItem",
        "dynamodb:GetItem",
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
    }
  ]
}