"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _token = require("../models/token");

var _token2 = _interopRequireDefault(_token);

var _env = require("../../config/env");

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Generate token with jsonwebtoken, create that token in our DB and return the token */

function generateToken(req, res, next) {
  var jwtPayload = {
    id: "uhosuiheiovhzgigrhop"
  };
  var jwtData = {
    expiresIn: _env2.default.jwtDuration
  };
  var secret = _env2.default.jwtSecret;
  req.token = _jsonwebtoken2.default.sign(jwtPayload, secret, jwtData);

  next();
}

function creatToken(req, res, next) {
  _token2.default.create({
    token: req.token
  });

  next();
}

function respondJWT(req, res) {
  res.status(200).json({
    jwt: req.token
  });
}

exports.default = { generateToken: generateToken, creatToken: creatToken, respondJWT: respondJWT };
module.exports = exports["default"];