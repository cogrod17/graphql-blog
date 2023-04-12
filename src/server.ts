import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import passport from "passport";

import * as dotenv from "dotenv";
import { LocalStrategy } from "./config/passport";
import graphql from "./graphql";
import { auth } from "./middleware";

dotenv.config();

class Server {
  public app: Application;

  constructor() {
    this.app = express();

    this.config();
    this.graphqlConfig();
    this.useRoutes(routes);
  }

  private graphqlConfig = () => this.app.use("/graphql", graphql);

  private config = () => {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    passport.use(LocalStrategy);
    // this.app.use(
    //   session({
    //     secret: process.env.SESSION_SECRET || "secret",
    //     cookie: { maxAge: 6000 },
    //     resave: false,
    //     saveUninitialized: false,
    //   })
    // );

    this.app.use(passport.initialize());
    this.app.use(auth.optional);

    // this.app.use(passport.session());
  };

  private useRoutes = (routes: Router[]) => {
    for (let route of routes) this.app.use(route);
  };

  public start = (port: number): Promise<object | number> =>
    new Promise((resolve, reject) =>
      this.app
        .listen(port, () => {
          resolve(port);
          console.log("listening on port: " + port);
        })
        .on("error", (err: object) => reject(err))
    );
}

export default new Server();
