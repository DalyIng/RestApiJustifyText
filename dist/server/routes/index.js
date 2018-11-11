"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _justify = require("./justify");

var _justify2 = _interopRequireDefault(_justify);

var _token = require("./token");

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use("/justify", _justify2.default);
router.use("/token", _token2.default);

exports.default = router;
module.exports = exports["default"];