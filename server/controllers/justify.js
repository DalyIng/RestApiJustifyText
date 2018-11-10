import Token from "../models/token";
import justificationCtrl from "./justificationMethod";
import config from '../../config/env';

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
      if (result.words + numberWords < config.limitWords) {
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
  //var justifiedTextList = textJustification(words, 80);
  var justifiedTextList = justificationCtrl.textJustification(words, 80);
  //console.log(justifiedTextList);
  var justifiedText = justifiedTextList.join("\n");
  //console.log(justifiedText);
  //console.log(token);
  ///////////////////////////////////
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
  ///////////////////////////////////
  res.set("Content-Type", "text/plain");
  res.send(justifiedText);
}

export default { justify, limit };
