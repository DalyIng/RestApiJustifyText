'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpLoadPlugins = require('gulp-load-plugins');

var _gulpLoadPlugins2 = _interopRequireDefault(_gulpLoadPlugins);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load the gulp plugins into the `plugins` variable
var plugins = (0, _gulpLoadPlugins2.default)();

var paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**'],
  tests: './server/test/**/*.test.js'
};

// Compile all Babel Javascript into ES5 and put it into the dist dir
_gulp2.default.task('babel', function () {
  return _gulp2.default.src(paths.js, { base: '.' }).pipe(plugins.babel()).pipe(_gulp2.default.dest('dist'));
});

// Start server with restart on file change events
_gulp2.default.task('nodemon', ['babel'], function () {
  return plugins.nodemon({
    script: _path2.default.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['babel']
  });
});

// Clean up dist directory
_gulp2.default.task('clean', function () {
  return (0, _del2.default)('dist/**');
});

// Set environment variables
_gulp2.default.task('set-env', function () {
  plugins.env({
    vars: {
      NODE_ENV: 'test'
    }
  });
});

// triggers mocha tests
_gulp2.default.task('test', ['set-env'], function () {
  var exitCode = 0;

  return _gulp2.default.src([paths.tests], { read: false }).pipe(plugins.plumber()).pipe(plugins.mocha({
    reporter: 'spec',
    ui: 'bdd',
    timeout: 2000,
    compilers: {
      js: _register2.default
    }
  })).once('error', function (err) {
    console.log(err);
    exitCode = 1;
  }).once('end', function () {
    process.exit(exitCode);
  });
});

_gulp2.default.task('mocha', ['clean'], function () {
  return (0, _runSequence2.default)('babel', 'test');
});