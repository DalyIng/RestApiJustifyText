'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Test the validation of the text sent, length of the text must greater than 80 */

exports.default = {
  justifyText: {
    body: {
      text: _joi2.default.string().min(80).required()
    }
  }
};
module.exports = exports['default'];