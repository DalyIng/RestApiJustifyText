"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  env: "test",
  db: "mongodb://tictactrip:Tictactrip123@ds159293.mlab.com:59293/tictactrip-test",
  port: 3000,
  jwtSecret: "my-api-secret",
  jwtDuration: "5000 hours",
  limitWords: 500,
  TIME: 60 * 5, // 5 MINUTES
  TimeOFScript: 1 // Every Minute
};
module.exports = exports["default"];