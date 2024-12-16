import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { userResolvers } from "./resolver";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefsArray = loadFilesSync("src/graphql/**/*.graphql");

const typeDefs = mergeTypeDefs(typeDefsArray);

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

// Create the schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
