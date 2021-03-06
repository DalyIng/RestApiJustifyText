"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require("../server/routes");

var _routes2 = _interopRequireDefault(_routes);

var _expressValidation = require("express-validation");

var _expressValidation2 = _interopRequireDefault(_expressValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use("/api", _routes2.default);
app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation2.default.ValidationError) {
    res.status(err.status).json(err);
  } else {
    res.status(500).json({
      status: err.status,
      message: err.message
    });
  }
});

exports.default = app;
module.exports = exports["default"];