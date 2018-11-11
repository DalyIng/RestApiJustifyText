import Token from "../models/token";
import justificationCtrl from "./justificationMethod";
import config from "../../config/env";

/** Test that the token hasn't formatted more than 80000 words, if that's the case we pass to the justify function and return the formatted text  */

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
        res.status(402).send("Payment Required");
      }
    });
}

function justify(req, res) {
  var token = req.headers.authorization.substring(7);
  Token.findOne({ token: token }, { words: true }, (err, result) => {
    if (err) {
      console.log("WRONG");
    } else {
      console.log(result);
    }
  });
  var text = req.body.text;
  var words = text.split(" ");
  var numberWords = text.trim().split(/\s+/).length;
  var justifiedTextList = justificationCtrl.textJustification(words, 80);
  var justifiedText = justifiedTextList.join("\n");
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
