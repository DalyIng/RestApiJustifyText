"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  env: "development",
  db: "mongodb://tictactrip:Azerty02@ds253353.mlab.com:53353/tictactrip",
  port: 3000,
  jwtSecret: "my-api-secret",
  jwtDuration: "5000 hours",
  limitWords: 5000,
  TIME: 60 * 5, // 5 MINUTES !
  TimeOFScript: 1 // Every Minute  
};
module.exports = exports["default"];