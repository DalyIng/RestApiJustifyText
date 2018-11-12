"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../controllers/user");

var _user2 = _interopRequireDefault(_user);

var _expressValidation = require("express-validation");

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _users = require("./validation/users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route("/")
/** POST /api/users - Create new user */
.post((0, _expressValidation2.default)(_users2.default.createUser), _user2.default.create);

exports.default = router;
module.exports = exports["default"];