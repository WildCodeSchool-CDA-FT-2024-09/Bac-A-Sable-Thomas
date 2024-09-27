// Entrypoint - configures the express server and starts it
import express from "express";
import router from "./router";

// TODO - env

const app = express();

// Express doesn't parse JSON by default
app.use(express.json());
app.use("/api", router);

app.listen(3000, async () => {
  console.log("Server is listening on http://localhost:3000");
});
