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
        const post = new models_1.Post({
            content,
            author: auth.id,
        });
        try {
            yield post.save();
            return post.populate("author");
        }
        catch (e) {
            return new Error(e);
        }
    }),
    getPosts: ({ page = 1, limit = 10, keyword = "" }) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield models_1.Post.find({
            content: { $regex: keyword },
        })
            .populate("author")
            .limit(limit)
            .skip((page - 1) * limit);
        const count = posts.length;
        return { posts, count, page, limit };
    }),
    getPostsByUser: ({ id = null }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({
            _id: id,
        }).populate("posts");
        if (!user)
            return new Error("No User found");
        return { posts: user.posts, user, count: user.posts.length };
    }),
    updatePost: ({ postId, content }, { auth }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(auth === null || auth === void 0 ? void 0 : auth.id))
            return new Error("Auth Required");
        const post = yield models_1.Post.findOneAndUpdate({ $and: [{ _id: postId }, { author: auth.id }] }, { content }, { new: true });
        if (!post)
            return new Error("No post found");
        yield post.save();
        return post.populate("author");
    }),
    deletePost: ({ postId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(auth === null || auth === void 0 ? void 0 : auth.id))
            return new Error("Auth Required");
        const post = yield models_1.Post.findOneAndDelete({
            $and: [{ _id: postId }, { author: auth.id }],
        });
        if (!post)
            return new Error("No post found");
        return post;
    }),
};
