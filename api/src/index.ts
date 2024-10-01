// Entrypoint - configures the express server and starts it
import express from "express";
import router from "./router";
import "reflect-metadata";
import dataSource from "./db/data-source";

// TODO - env

const app = express();

// Express doesn't parse JSON by default
app.use(express.json());
app.use("/api", router);

app.listen(3000, async () => {
  dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  console.log("Server is listening on http://localhost:3000");
});
