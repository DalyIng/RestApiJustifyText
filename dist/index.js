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

_nodeCron2.default.schedule("0,9,19,29,39,49,59 * * * *", function () {
  var d = new Date();
  _token2.default.find({}, { created_at: 1 }).exec(function (err, tokens) {
    if (err || tokens == undefined || tokens.length == 0) ;else {
      tokens.forEach(function (token) {
        var seconds = (d.getTime() - token.created_at.getTime()) / 1000;
        console.log(seconds);
        console.log(_env2.default.TIME);
        if (seconds > _env2.default.TIME) {
          _token2.default.findOneAndUpdate({ _id: token._id }, { $currentDate: { created_at: true } }).exec();
          _token2.default.findOneAndUpdate({ _id: token._id }, { $set: { words: 0 } }).exec();
        } else {}
      });
    }
  });
});

_mongoose2.default.connect(_env2.default.db);
_mongoose2.default.connection.on("error", function () {
  throw new Error("unable to connect to database: " + _env2.default.db);
});
_mongoose2.default.connection.on("connected", function () {
  console.log("Connected to database: " + _env2.default.db);
});

if (_env2.default.env === "development") {
  _mongoose2.default.set("debug", true);
}
_express2.default.listen(_env2.default.port, function () {
  console.log("API Server started and listening on port " + _env2.default.port + " (" + _env2.default.env + ")");
});

exports.default = _express2.default;
module.exports = exports["default"];