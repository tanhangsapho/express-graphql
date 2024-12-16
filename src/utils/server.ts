import { app } from "..";
import connectMongoDB from "../database";
import getConfig from "./config";
import { logger, logInit } from "./logger";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "../graphql";
import { json } from "express";

export async function run() {
  try {
    const config = getConfig(process.env.NODE_ENV);

    // Activate Logger
    logInit({ env: config.env, logLevel: config.logLevel });

    // Activate Database
    const mongodb = connectMongoDB.getInstance();
    await mongodb.connect({ url: config.mongoUrl as string });

    // Initialize Apollo Server
    const apolloServer = new ApolloServer({
      schema,
    });
    await apolloServer.start();

    // Add Apollo Middleware before Express starts listening
    app.use("/graphql", json(), expressMiddleware(apolloServer));

    // Start Express Server
    const server = app.listen(config.port, () => {
      logger.info(`Server is listening on port: ${config.port}`);
      logger.info("Apollo Server is running on http://localhost:4000/graphql");
    });

    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          logger.info("Server closed!");
          await mongodb.disconnect();
          logger.info("MongoDB disconnected!");
          process.exit(1);
        });
      } else {
        await mongodb.disconnect();
        logger.info("MongoDB disconnected.");
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error: unknown) => {
      logger.error("Unhandled error", { error });
      exitHandler();
    };

    // Handle uncaught errors and graceful shutdown
    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) server.close();
    });
  } catch (error) {
    logger.error("Failed to initialize application", { error });
    process.exit(1);
  }
}
