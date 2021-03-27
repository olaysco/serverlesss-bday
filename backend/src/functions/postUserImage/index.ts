export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/user/images',
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
        authorizer: "authorizer"
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [   
        "s3:PutObject"
      ],
      Resource: "arn:aws:s3:::${self:provider.environment.CARD_S3_BUCKET}/*"
    },
    {
      Effect: "Allow",
      Action: [
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
    }
  ]
}
