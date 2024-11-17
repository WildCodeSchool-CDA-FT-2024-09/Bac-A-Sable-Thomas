import "reflect-metadata";
import * as dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;

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
    listen: { port: Number(PORT) },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
