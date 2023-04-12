"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const database_1 = require("./database");
(0, database_1.initDB)();
const port = parseInt(process.env.PORT || "1717");
server_1.default.app.get("/", (req, res) => {
    return res.json({ hello: "world" });
});
server_1.default.start(port);
