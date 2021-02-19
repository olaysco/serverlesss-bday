
export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'put',
        path: '/user',
        authorizer: {
          name: "AuthO"
        },
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
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.CONTACT_TABLE}/index/${self:provider.environment.CONTACT_USER_INDEX}"
    }
  ]
}