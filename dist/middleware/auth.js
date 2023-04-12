"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = exports.auth = void 0;
const express_jwt_1 = require("express-jwt");
const config_1 = __importDefault(require("../config"));
const token = (req) => {
    var _a, _b, _c;
    if ((req.header("Authorization") &&
        ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) === "Token") ||
        (req.header("Authorization") &&
            ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.split(" ")[0]) === "Bearer")) {
        return (_c = req.header("Authorization")) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
    }
    return undefined;
};
const getTokenFromHeader = (req) => token(req);
exports.auth = {
    required: (0, express_jwt_1.expressjwt)({
        secret: config_1.default.secret,
        getToken: getTokenFromHeader,
        algorithms: ["HS256"],
    }),
    optional: (0, express_jwt_1.expressjwt)({
        secret: config_1.default.secret,
        credentialsRequired: false,
        getToken: getTokenFromHeader,
        algorithms: ["HS256"],
    }),
};
const filter = (req, res, next) => {
    console.log(req);
};
exports.filter = filter;
