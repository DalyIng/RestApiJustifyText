export default {
  env: "production",
  db: "mongodb://tictactrip:Azerty02@ds253353.mlab.com:53353/tictactrip",
  port: process.env.PORT,
  jwtSecret: "my-api-secret",
  jwtDuration: "2 hours"
};
