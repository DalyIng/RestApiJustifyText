"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _token = require("../models/token");

var _token2 = _interopRequireDefault(_token);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _env = require("../../config/env");

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Generate token with jsonwebtoken, create that token in our DB and return the token */

function authenticate(req, res, next) {
  /*if (req.body.email === config.email){
    next();
  } else {
    res.json({
      State: "Undefined User"
    });
  }*/
  _user2.default.findOne({
    email: req.body.email
  }).exec().then(function (user) {
    if (!user) return next();
    user.comparePassword(req.body.password, function (e, isMatch) {
      if (e) return next(e);
      if (isMatch) {
        req.user = user;
        next();
      } else {
        return next();
      }
    });
  }, function (e) {
    return next(e);
  });
}

function generateToken(req, res, next) {
  /*const jwtPayload = {
    id: config.email
  };
  const jwtData = {
    expiresIn: config.jwtDuration
  };
  const secret = config.jwtSecret;
  req.token = jwt.sign(jwtPayload, secret, jwtData);
   next();*/
  if (!req.user) return next();

  var jwtPayload = {
    id: req.user._id
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
  /*res.status(200).json({
    jwt: req.token
  });*/
  if (!req.user) {
    res.status(401).json({
      error: "Unauthorized"
    });
  } else {
    res.status(200).json({
      jwt: req.token
    });
  }
}

exports.default = { authenticate: authenticate, generateToken: generateToken, creatToken: creatToken, respondJWT: respondJWT };
module.exports = exports["default"];