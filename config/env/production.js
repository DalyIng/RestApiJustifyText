export default {
  env: "production",
  db: "mongodb://<user>:<password>@ds253353.mlab.com:53353/<databaseName>",
  port: process.env.PORT,
  jwtSecret: "my-api-secret",
  jwtDuration: "5000 hours",
  limitWords: 80000,
  TIME: 60 * 60 * 24 // 24 HOURS
};
