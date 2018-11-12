import Token from "../models/token";
import justificationCtrl from "./justificationMethod";
import config from "../../config/env";

/** Test that the token hasn't formatted more than 80000 words, if that's the case we pass to the justify function and return the formatted text  */

function limit(req, res, next) {
  let text = req.body.text;
  let numberWords = text.trim().split(/\s+/).length;
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
  let token = req.headers.authorization.substring(7);
  Token.findOne({ token: token }, { words: true }, (err, result) => {
    if (err) {
      console.log("NOT FOUND");
    } else {
      console.log(result);
    }
  });
  let text = req.body.text;
  let justifiedParagraphes = [];
  let paragraphes = text.split(/[\r\n\t]+/gm);
  for (let i=0; i < paragraphes.length; i++){
    let wordsParagraphe = paragraphes[i].split(" ");
    let justifiedParagraphe = justificationCtrl.textJustification(wordsParagraphe, 80);
    let justifiedTextList = justifiedParagraphe.join("\n");
    justifiedParagraphes.push(justifiedTextList);
  }
  console.log(justifiedParagraphes.join("\n"));
  let justifiedText = justifiedParagraphes.join("\n");
  let words = text.split(" ");
  let numberWords = text.trim().split(/\s+/).length;
  /*let justifiedTextList = justificationCtrl.textJustification(words, 80);
  let justifiedText = justifiedTextList.join("\n");*/
  let query = { token: token };
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
  /** CONTENT TYPE: text/plain */
  res.set("Content-Type", "text/plain");
  res.send(justifiedText);
}

export default { justify, limit };
