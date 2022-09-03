export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
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
        }
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
        "dynamodb:Query"
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.CONTACT_TABLE}"
    }
  ]
}
