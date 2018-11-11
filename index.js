import app from "./config/express";
import config from "./config/env";
import mongoose from "mongoose";
import cron from "node-cron";
import Token from "./server/models/token";

/** Run this script every 10 minutes! */
cron.schedule("0 */2 * * * *", function() {
  const d = new Date();
  Token.find({}, { created_at: 1 }).exec((err, tokens) => {
    if (err || tokens == undefined || tokens.length == 0);
    else {
      tokens.forEach(token => {
        var seconds = (d.getTime() - token.created_at.getTime()) / 1000;
        console.log(seconds);
        console.log(config.TIME);
        if (seconds > config.TIME) {
          Token.findOneAndUpdate(
            { _id: token._id },
            { $currentDate: { created_at: true} }
          ).exec();
          Token.findOneAndUpdate(
            { _id: token._id },
            { $set: { words: 0 } }
          ).exec();
          
        } else {
        }
      });
    }
  });
});

mongoose.connect(config.db);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});
mongoose.connection.on("connected", () => {
  console.log(`Connected to database: ${config.db}`);
});

if (config.env === "development") {
  mongoose.set("debug", true);
}
app.listen(config.port, () => {
  console.log(
    `API Server started and listening on port ${config.port} (${config.env})`
  );
});

export default app;
