"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("./config/express");

var _express2 = _interopRequireDefault(_express);

var _env = require("./config/env");

var _env2 = _interopRequireDefault(_env);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nodeCron = require("node-cron");

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _token = require("./server/models/token");

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Run this script every 1 minute in development mode! */

if (_env2.default.env === "development" || _env2.default.env === "test") {
  _nodeCron2.default.schedule("*/" + _env2.default.TimeOFScript + " * * * * ", function () {
    var d = new Date();
    _token2.default.find({}, { created_at: 1 }).exec(function (err, tokens) {
      if (err || tokens == undefined || tokens.length == 0) ;else {
        tokens.forEach(function (token) {
          var seconds = (d.getTime() - token.created_at.getTime()) / 1000;
          if (seconds > _env2.default.TIME) {
            _token2.default.findOneAndUpdate({ _id: token._id }, { $currentDate: { created_at: true } }).exec();
            _token2.default.findOneAndUpdate({ _id: token._id }, { $set: { words: 0 } }).exec();
          } else {}
        });
      }
    });
  });
}

/** Run the script /bin/restoreWords script due to Heroki Scheduler every hour */
else {

    console.log("WORK FOR SCHEDULER!");
  }

/** Set Connection to database */

_mongoose2.default.connect(_env2.default.db);
_mongoose2.default.connection.on("error", function () {
  throw new Error("unable to connect to database: " + _env2.default.db);
});
_mongoose2.default.connection.on("connected", function () {
  console.log("Connected to database of: " + _env2.default.env);
});

if (_env2.default.env === "development") {
  _mongoose2.default.set("debug", true);
}

/** Set port and env for our app */

_express2.default.listen(_env2.default.port, function () {
  console.log("API Server started and listening on port " + _env2.default.port + " (" + _env2.default.env + ")");
});

exports.default = _express2.default;
module.exports = exports["default"];