"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** The Text Justification Method */

function textJustification(words, L) {
  var lines = [],
      index = 0;

  while (index < words.length) {
    var count = words[index].length;
    var last = index + 1;

    while (last < words.length) {
      if (words[last].length + count + 1 > L) break;
      count += words[last].length + 1;
      last++;
    }

    var line = "";
    var difference = last - index - 1;

    // if we're on the last line or the number of words in the line is
    // 1, we left justify
    if (last === words.length || difference === 0) {
      for (var i = index; i < last; i++) {
        line += words[i] + " ";
      }

      line = line.substr(0, line.length - 1);
      for (var _i = line.length; _i < L; _i++) {
        line += " ";
      }
    } else {
      // now we need to middle justify, which is putting equal amount
      // of spaces between words
      var spaces = (L - count) / difference;
      var remainder = (L - count) % difference;

      for (var _i2 = index; _i2 < last; _i2++) {
        line += words[_i2];

        if (_i2 < last - 1) {
          var limit = spaces + (_i2 - index < remainder ? 1 : 0);
          for (var j = 0; j <= limit; j++) {
            line += " ";
          }
        }
      }
    }
    lines.push(line);
    index = last;
  }
  return lines;
}

exports.default = { textJustification: textJustification };
module.exports = exports["default"];