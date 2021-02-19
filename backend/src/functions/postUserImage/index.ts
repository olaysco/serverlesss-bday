export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/user/images',
        cors: true,
        authorizer: {
          name: "AuthO"
        }
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
    }
  ]
}
