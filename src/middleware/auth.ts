import { NextFunction, Request } from "express";
import { expressjwt as jwt, TokenGetter, Params } from "express-jwt";
import config from "../config";

const token = (req: Request) => {
  if (
    (req.header("Authorization") &&
      req.header("Authorization")?.split(" ")[0] === "Token") ||
    (req.header("Authorization") &&
      req.header("Authorization")?.split(" ")[0] === "Bearer")
  ) {
    return req.header("Authorization")?.split(" ")[1];
  }

  return undefined;
};

const getTokenFromHeader: TokenGetter = (
  req: Request
): string | Promise<string> | undefined => token(req);

export const auth = {
  required: jwt({
    secret: config.secret,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: config.secret,
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),
};

export const filter = (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
};
