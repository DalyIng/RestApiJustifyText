"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Token Model */

var TokenSchema = new _mongoose2.default.Schema({
  token: {
    type: String,
    required: false
  },
  words: {
    type: Number,
    required: false,
    default: 0
  },
  created_at: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model("Token", TokenSchema);
module.exports = exports["default"];