import "reflect-metadata";
import express, { json } from "express";
import { run } from "./utils/server";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { schema } from "./graphql";
import { logger } from "./utils/logger";

export const app = express();

run();
// async function startServer() {
//   const server = new ApolloServer({
//     schema,
//   });

//   // Await server startup
//   await server.start();

//   // Apply middleware after server has started
//   app.use("/graphql", json(), expressMiddleware(server));
// }

// // Start the server setup
// startServer().then(() => {
//   logger.info("Apollo Server is running on http://localhost:4000/graphql");
// });
