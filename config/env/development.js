export default {
  env: "development",
  db: "mongodb://<username>:<password>@ds253353.mlab.com:53353/<databaseName>",
  port: 3000,
  jwtSecret: "my-api-secret",
  jwtDuration: "5000 hours",
  limitWords: 5000,
  TIME: 60 * 5, // 5 MINUTES !
  TimeOFScript: 1 // Every Minute  
};
