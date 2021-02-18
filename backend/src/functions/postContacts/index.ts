export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  "events": [
    {
      httpApi: {
        method: 'post',
        path: '/contact',
        authorizer: {
          name: "AuthO"
        },
        reqValidatorName: "contactBody",
        documentation: {
          summary: "Post contacts",
          description: "Post contacts",
          tags: "Contacts",
          requestModels: {
            "application/json": "contactPostRequest"
          }
        }
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [   
        "dynamodb:PutItem",
        "dynamodb:GetItem"
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.CONTACT_TABLE}/index/${self:provider.environment.CONTACT_USER_INDEX}"
    }
  ]
}