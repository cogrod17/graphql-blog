"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secret = process.env.NODE_ENV === "production" ? process.env.SECRET : "secret";
const config = {
    secret: secret || "secret",
};
exports.default = config;
