export default {
  env: "test",
  db: "mongodb://<username>:<password>@ds159293.mlab.com:59293/<databaseName>",
  port: 3000,
  jwtSecret: "my-api-secret",
  jwtDuration: "5000 hours",
  limitWords: 500,
  TIME: 60 * 5, // 5 MINUTES
  TimeOFScript: 1 // Every Minute
};
