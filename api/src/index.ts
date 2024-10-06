// Entrypoint - configures the express server and starts it
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./router";
import "reflect-metadata";
import dataSource from "./db/data-source";

dotenv.config();
const { PORT, FRONTEND_URL } = process.env;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

// Express doesn't parse JSON by default
app.use(express.json());
app.use("/api", router);

app.listen(PORT, async () => {
  dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  console.log(`Server is listening on http://localhost:${PORT}`);
});
