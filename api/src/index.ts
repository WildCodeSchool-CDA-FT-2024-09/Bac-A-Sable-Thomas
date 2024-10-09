// // Entrypoint - configures the express server and starts it
// import * as dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import router from "./router";
// import "reflect-metadata";
// import dataSource from "./db/data-source";

// dotenv.config();
// const { PORT, FRONTEND_URL } = process.env;

// const app = express();

// app.use(
//   cors({
//     origin: FRONTEND_URL,
//   })
// );

// // Express doesn't parse JSON by default
// app.use(express.json());
// app.use("/api", router);

// app.listen(PORT, async () => {
//   dataSource
//     .initialize()
//     .then(() => {
//       console.log("Data Source has been initialized");
//     })
//     .catch((err) => {
//       console.error("Error during Data Source initialization", err);
//     });
//   console.log(`Server is listening on http://localhost:${PORT}`);
// });

import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line
import { buildSchema } from "type-graphql";
import AppDataSource from "./db/data-source";
import RepoResolver from "./repos/repo.resolver";
import LanguageResolver from "./languages/language.resolver";
import CommentResolver from "./comments/comment.resolver";

(async () => {
  // Create schema from imports of resolvers
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, LanguageResolver, CommentResolver],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
