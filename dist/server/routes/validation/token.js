'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Test the validation of Email and length of Password sent in post body when asking for a new token */

exports.default = {
  generateToken: {
    body: {
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().min(6).required()
    }
  }
};
module.exports = exports['default'];