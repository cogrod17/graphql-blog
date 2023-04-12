import { Schema, model } from "mongoose";
import crypto from "crypto";
import jwt, { Secret } from "jsonwebtoken";
import config from "../config";
import {
  UserForClient,
  UserMethods,
  UserModel,
  UserType,
  IUser,
} from "../@types";
import { Post } from "./Post";

const secret = config.secret;

export const UserSchema = new Schema<UserType, UserModel, UserMethods>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
    },
    bio: String,
    hash: String,
    salt: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.methods.setPassword = function (password: string): void {
  this.salt = crypto.randomBytes(17).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.verifyPassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function (): Secret {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(`${exp.getTime() / 1000}`),
      algorithm: "HS256",
    },
    secret
  );
};

UserSchema.methods.forClient = function (): UserForClient {
  return {
    email: this.email,
    bio: this.bio,
  };
};

UserSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await Post.deleteMany({ author_id: this._id });
    next();
  }
);

export const User = model<IUser>("User", UserSchema);
