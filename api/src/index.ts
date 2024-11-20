import "reflect-metadata";
import * as dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;

import AppDataSource from "./db/data-source";
import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line
import { buildSchema } from "type-graphql";
import RepoResolver from "./repos/repo.resolver";
import LanguageResolver from "./languages/language.resolver";
import CommentResolver from "./comments/comment.resolver";
import UserResolver from "./user/user.resolver";

(async () => {
  // Create schema from imports of resolvers
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, LanguageResolver, CommentResolver, UserResolver],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => ({ req, res }),
  });
  console.log(`🚀 Apollo Server ready at: ${url}`);
})();
