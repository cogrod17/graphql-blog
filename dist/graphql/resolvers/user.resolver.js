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
exports.userResolver = void 0;
const models_1 = require("../../models");
exports.userResolver = {
    getUser: (args, { auth }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(auth === null || auth === void 0 ? void 0 : auth.id))
            return new Error("Auth Required");
        const user = yield models_1.User.findOne({ email: args.email });
        if (!user)
            throw new Error("No user found");
        return user;
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () { return yield models_1.User.find(); }),
    updateUser: (updates, { auth }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(auth === null || auth === void 0 ? void 0 : auth.id))
            return new Error("Auth required");
        if (!Object.keys(updates).length)
            return new Error("Nothing to update");
        const user = yield models_1.User.findOneAndUpdate({ _id: auth === null || auth === void 0 ? void 0 : auth.id }, updates, {
            new: true,
        });
        if (!user)
            return new Error("There was an error");
        user.save();
        return user;
    }),
    deleteUser: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userId)
            return new Error("Need to have user id");
        const user = yield models_1.User.findById(userId);
        if (!user)
            throw new Error("No user found");
        user.deleteOne();
        return user;
    }),
};
