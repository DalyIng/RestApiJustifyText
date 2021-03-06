"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _token = require("../controllers/token");

var _token2 = _interopRequireDefault(_token);

var _expressValidation = require("express-validation");

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _token3 = require("./validation/token");

var _token4 = _interopRequireDefault(_token3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route("/")
/** POST /api/token Get JWT authentication token */
.post((0, _expressValidation2.default)(_token4.default.generateToken), _token2.default.authenticate, _token2.default.generateToken, _token2.default.creatToken, _token2.default.respondJWT);

exports.default = router;
module.exports = exports["default"];