"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    author_id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
}, { timestamps: true });
exports.Post = (0, mongoose_1.model)("Post", PostSchema);
