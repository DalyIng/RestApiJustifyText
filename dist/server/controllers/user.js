'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Create a user in our DB */

function create(req, res, next) {
  _user2.default.create({
    email: req.body.email,
    password: req.body.password
  }).then(function (savedUser) {
    return res.json(savedUser);
  }, function (e) {
    return next(e);
  });
}

exports.default = { create: create };
module.exports = exports['default'];