export default {
  env: "production",
  db: "mongodb://tictactrip:Azerty02@ds253353.mlab.com:53353/tictactrip",
  port: process.env.PORT,
  jwtSecret: "my-api-secret",
  jwtDuration: "5000 hours",
  limitWords: 80000,
  TIME: 60 * 60 * 24, // 24 HOURS
  TimeOFScript: 45 // Every 30 Minutes
};
