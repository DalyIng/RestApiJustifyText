import app from "./config/express";
import config from "./config/env";

app.listen(config.port, () => {
  console.log(
    `API Server started and listening on port ${config.port} (${config.env})`
  );
});

export default app;
