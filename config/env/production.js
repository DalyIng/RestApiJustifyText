export default {
  env: "production",
  db: "mongodb://<username>:<password>@ds159293.mlab.com:59293/<databaseName>",
  port: process.env.PORT,
  jwtSecret: "my-api-secret",
  jwtDuration: "5000 hours",
  limitWords: 80000,
  TIME: 60 * 60 * 24 // 24 HOURS
};
