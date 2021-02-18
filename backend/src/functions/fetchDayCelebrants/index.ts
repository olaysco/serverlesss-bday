export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/contact/fetchCelebrant'
      }
    },
    {
        schedule: 'cron(0 1 * * ? *)'
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
    }
  ]
}