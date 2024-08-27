import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { TransactionResolver } from "./resolvers/TransactionResolver";
import { startKafka } from "./kafka";
import { processTransaction } from "./services/TransactionService";
import { AppDataSource } from "../data-source";

(async () => {
  await AppDataSource.initialize();
  await startKafka();

  const schema = await buildSchema({
    resolvers: [TransactionResolver],
  });

  const server = new ApolloServer({ schema });
  const app = Express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000/graphql");
  });

  processTransaction();
})();
