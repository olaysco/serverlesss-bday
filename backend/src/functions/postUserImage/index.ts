export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/user/images',
        cors: true,
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
        "dynamodb:UpdateItem",
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
    }
  ]
}
