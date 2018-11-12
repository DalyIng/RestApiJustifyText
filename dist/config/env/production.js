"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  env: "production",
  db: "mongodb://tictactrip:Azerty02@ds159293.mlab.com:59293/tictactrip-prod",
  port: process.env.PORT,
  jwtSecret: "my-api-secret",
  jwtDuration: "5000 hours",
  limitWords: 80000,
  TIME: 60 * 60 * 24 // 24 HOURS
};
module.exports = exports["default"];