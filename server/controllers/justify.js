import Token from "../models/token";

function textJustification(words, L) {
  let lines = [],
    index = 0;

  while (index < words.length) {
    let count = words[index].length;
    let last = index + 1;

    while (last < words.length) {
      if (words[last].length + count + 1 > L) break;
      count += words[last].length + 1;
      last++;
    }

    let line = "";
    let difference = last - index - 1;

    // if we're on the last line or the number of words in the line is
    // 1, we left justify
    if (last === words.length || difference === 0) {
      for (let i = index; i < last; i++) {
        line += words[i] + " ";
      }

      line = line.substr(0, line.length - 1);
      for (let i = line.length; i < L; i++) {
        line += " ";
      }
    } else {
      // now we need to middle justify, which is putting equal amount
      // of spaces between words
      let spaces = (L - count) / difference;
      let remainder = (L - count) % difference;

      for (let i = index; i < last; i++) {
        line += words[i];

        if (i < last - 1) {
          let limit = spaces + (i - index < remainder ? 1 : 0);
          for (let j = 0; j <= limit; j++) {
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

function limit(req, res, next) {
  var text = req.body.text;
  var numberWords = text.trim().split(/\s+/).length;
  Token.findOne(
    {
      token: req.headers.authorization.substring(7)
    },
    { words: true }
  )
    .exec()
    .then(result => {
      if (result.words + numberWords < 350) {
        return next();
      } else {
        res.status(402).json({
          message: "By this request, you will pass the limit of 80000 words",
          error: "Payment Required"
        });
      }
    });
}

function justify(req, res) {
  //console.log(req.body.text);
  var token = req.headers.authorization.substring(7);

  Token.findOne(
    // query
    { token: token },

    // Only return an object with the "name" and "owner" fields. "_id"
    // is included by default, so you'll need to remove it if you don't want it.
    { words: true },

    // callback function
    (err, result) => {
      if (err) {
        console.log("WRONG");
      } else {
        console.log(result);
      }
    }
  );
  var text = req.body.text;
  var words = text.split(" ");
  //console.log(words);
  var numberWords = text.trim().split(/\s+/).length;
  //console.log(numberWords);
  var textLength = text.length;
  //console.log(textLength);
  var justifiedTextList = textJustification(words, 80);
  //console.log(justifiedTextList);
  var justifiedText = justifiedTextList.join("\n");
  //console.log(justifiedText);
  //console.log(token);
  var query = { token: token };
  Token.findOneAndUpdate(
    query,
    { $inc: { words: numberWords } },
    {
      new: true
    },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  res.set("Content-Type", "text/plain");
  res.send(justifiedText);
}

export default { justify, limit };
