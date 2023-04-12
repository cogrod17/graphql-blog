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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const Post_1 = require("./Post");
const secret = config_1.default.secret;
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        index: true,
    },
    bio: String,
    hash: String,
    salt: String,
}, { timestamps: true, toJSON: { virtuals: true } });
exports.UserSchema.methods.setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(17).toString("hex");
    this.hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 512, "sha512")
        .toString("hex");
};
exports.UserSchema.methods.verifyPassword = function (password) {
    const hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 512, "sha512")
        .toString("hex");
    return this.hash === hash;
};
exports.UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jsonwebtoken_1.default.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(`${exp.getTime() / 1000}`),
        algorithm: "HS256",
    }, secret);
};
exports.UserSchema.methods.forClient = function () {
    return {
        email: this.email,
        bio: this.bio,
    };
};
exports.UserSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "author",
});
exports.UserSchema.pre("deleteOne", { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Post_1.Post.deleteMany({ author_id: this._id });
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", exports.UserSchema);
