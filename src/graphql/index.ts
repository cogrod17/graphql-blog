import { graphqlHTTP, Options } from "express-graphql";
import { schema } from "./schema/index.js";
import { rootResolver } from "./resolvers";

export default graphqlHTTP((req, res, params) => {
  // console.log(params);

  return {
    schema,
    rootValue: rootResolver,
    graphiql: true,
    context: req,
  };
});

export * from "./schema";
