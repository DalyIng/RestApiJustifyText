import app from "./config/express";
import config from "./config/env";
import mongoose from "mongoose";
import cron from "node-cron";
import Token from "./server/models/token";

/** Run this script every 1 minute in development mode! */

if (config.env === "development" || config.env === "test") {
  cron.schedule(`*/${config.TimeOFScript} * * * * `, function() {
    const d = new Date();
    Token.find({}, { created_at: 1 }).exec((err, tokens) => {
      if (err || tokens == undefined || tokens.length == 0);
      else {
        tokens.forEach(token => {
          var seconds = (d.getTime() - token.created_at.getTime()) / 1000;
          if (seconds > config.TIME) {
            Token.findOneAndUpdate(
              { _id: token._id },
              { $currentDate: { created_at: true } }
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
}

/** Run the script /bin/restoreWords script due to Heroki Scheduler every hour */
else {

  console.log("WORK FOR SCHEDULER!")
}

/** Set Connection to database */

mongoose.connect(config.db);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});
mongoose.connection.on("connected", () => {
  console.log(`Connected to database of: ${config.env}`);
});

if (config.env === "development") {
  mongoose.set("debug", true);
}

/** Set port and env for our app */

app.listen(config.port, () => {
  console.log(
    `API Server started and listening on port ${config.port} (${config.env})`
  );
});

export default app;
