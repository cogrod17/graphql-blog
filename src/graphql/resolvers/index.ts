import { authResolvers } from "./auth.resolver";
import { userResolver } from "./user.resolver";
import { postResolver } from "./post.resolvers";

export const rootResolver = {
  ...authResolvers,
  ...userResolver,
  ...postResolver,
};
