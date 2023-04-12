import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/index.js";
import { rootResolver } from "./resolvers";

export default graphqlHTTP((req) => ({
  schema,
  rootValue: rootResolver,
  graphiql: true,
  context: req,
}));

export * from "./schema";
