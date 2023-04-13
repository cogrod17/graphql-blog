"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolvers = void 0;
const models_1 = require("../../models");
exports.authResolvers = {
    createUser: (args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = new models_1.User();
            user.email = args.email;
            user.setPassword(args.password);
            yield user.save();
            return {
                _id: user === null || user === void 0 ? void 0 : user._id,
                email: user.email,
                bio: user.bio,
                token: user.generateJWT(),
            };
        }
        catch (err) {
            return err;
        }
    }),
    login: (args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.email || !args.password)
            throw new Error("Email and password required");
        const user = yield models_1.User.findOne({ email: args.email });
        if (!user || !user.verifyPassword(args.password))
            throw new Error("Incorrect email or password");
        return {
            _id: user._id,
            email: user.email,
            bio: user.bio,
            token: user.generateJWT(),
        };
    }),
};
