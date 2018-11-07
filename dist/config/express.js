'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('../server/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//app.get('/', (req, res) => res.send('Hello, this is API and I\'m ok!'));
app.use('/api', _routes2.default);

exports.default = app;
module.exports = exports['default'];