"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _justify = require("../controllers/justify");

var _justify2 = _interopRequireDefault(_justify);

var _jwt = require("../../config/jwt");

var _jwt2 = _interopRequireDefault(_jwt);

var _expressValidation = require("express-validation");

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _justify3 = require("./validation/justify");

var _justify4 = _interopRequireDefault(_justify3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route("/")
/** Before justifing text we test validation, then test the validity of token and see that this token hasn't formatted more than 80000 words  */
.post((0, _expressValidation2.default)(_justify4.default.justifyText), _jwt2.default, _justify2.default.limit, _justify2.default.justify);

exports.default = router;
module.exports = exports["default"];