"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _token = require("../models/token");

var _token2 = _interopRequireDefault(_token);

var _justificationMethod = require("./justificationMethod");

var _justificationMethod2 = _interopRequireDefault(_justificationMethod);

var _env = require("../../config/env");

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Test that the token hasn't formatted more than 80000 words, if that's the case we pass to the justify function and return the formatted text  */

function limit(req, res, next) {
  var text = req.body.text;
  var numberWords = text.trim().split(/\s+/).length;
  _token2.default.findOne({
    token: req.headers.authorization.substring(7)
  }, { words: true }).exec().then(function (result) {
    if (result.words + numberWords < _env2.default.limitWords) {
      return next();
    } else {
      res.status(402).send("Payment Required");
    }
  });
}

function justify(req, res) {
  var token = req.headers.authorization.substring(7);
  _token2.default.findOne({ token: token }, { words: true }, function (err, result) {
    if (err) {
      console.log("NOT FOUND");
    } else {
      console.log(result);
    }
  });
  var text = req.body.text;
  var justifiedParagraphes = [];
  var paragraphes = text.split(/[\r\n\t]+/gm);
  for (var i = 0; i < paragraphes.length; i++) {
    var wordsParagraphe = paragraphes[i].split(" ");
    var justifiedParagraphe = _justificationMethod2.default.textJustification(wordsParagraphe, 80);
    var justifiedTextList = justifiedParagraphe.join("\n");
    justifiedParagraphes.push(justifiedTextList);
  }
  console.log(justifiedParagraphes.join("\n"));
  var justifiedText = justifiedParagraphes.join("\n");
  var words = text.split(" ");
  var numberWords = text.trim().split(/\s+/).length;
  var query = { token: token };
  _token2.default.findOneAndUpdate(query, { $inc: { words: numberWords } }, {
    new: true
  }, function (err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  });
  /** CONTENT TYPE: text/plain */
  res.set("Content-Type", "text/plain");
  res.send(justifiedText);
}

exports.default = { justify: justify, limit: limit };
module.exports = exports["default"];