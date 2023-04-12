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
exports.postResolver = void 0;
const models_1 = require("../../models");
exports.postResolver = {
    createPost: ({ content }, { auth }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(auth === null || auth === void 0 ? void 0 : auth.id))
            return new Error("Auth Required");
        const post = yield models_1.Post.create({
            content,
            author_id: auth.id,
        });
        yield post.save();
        return post;
    }),
    getPost: () => __awaiter(void 0, void 0, void 0, function* () {
        return new Error("somehting happpened");
    }),
    updatePost: () => __awaiter(void 0, void 0, void 0, function* () {
        return new Error("somehting happpened");
    }),
    deletePost: () => __awaiter(void 0, void 0, void 0, function* () {
        return new Error("somehting happpened");
    }),
};
