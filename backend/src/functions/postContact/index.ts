export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  "events": [
    {
      http: {
        method: 'post',
        path: '/contact',
        authorizer: "authorizer",
        cors: {
          origin: "*",
          headers: [
            "Content-Type",
            "X-Amz-Date",
            "Authorization",
            "X-Api-Key",
            "X-Amz-Security-Token",
            "X-Amz-User-Agent"
          ],
          allowCredentials: true
        },
        documentation: {
          summary: "Post contacts",
          description: "Post contacts",
          tags: "Contacts",
          request: {
            schema: {
              "application/json": "contactPostRequest"
            }
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
        "dynamodb:GetItem",
        "dynamodb:BatchWriteItem"
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.CONTACT_TABLE}"
    }
  ]
}