"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const passport_1 = __importDefault(require("passport"));
const dotenv = __importStar(require("dotenv"));
const passport_2 = require("./config/passport");
const graphql_1 = __importDefault(require("./graphql"));
const middleware_1 = require("./middleware");
dotenv.config();
class Server {
    constructor() {
        this.graphqlConfig = () => this.app.use("/graphql", graphql_1.default);
        this.config = () => {
            this.app.use(body_parser_1.default.urlencoded({ extended: true }));
            this.app.use(body_parser_1.default.json());
            passport_1.default.use(passport_2.LocalStrategy);
            // this.app.use(
            //   session({
            //     secret: process.env.SESSION_SECRET || "secret",
            //     cookie: { maxAge: 6000 },
            //     resave: false,
            //     saveUninitialized: false,
            //   })
            // );
            this.app.use(passport_1.default.initialize());
            this.app.use(middleware_1.auth.optional);
            // this.app.use(passport.session());
        };
        this.useRoutes = (routes) => {
            for (let route of routes)
                this.app.use(route);
        };
        this.start = (port) => new Promise((resolve, reject) => this.app
            .listen(port, () => {
            resolve(port);
            console.log("listening on port: " + port);
        })
            .on("error", (err) => reject(err)));
        this.app = (0, express_1.default)();
        this.config();
        this.graphqlConfig();
        this.useRoutes(routes_1.default);
    }
}
exports.default = new Server();
