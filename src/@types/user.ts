import { Secret } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Model, Document } from "mongoose";
import { IPost } from "./post";

export type CreateUserType = {
  email: string;
  password: string;
};

export type PublicUser = {
  _id: string | number;
  email: string;
  bio: string | null;
};

export type UserType = {
  email: string;
  hash: string;
  salt: string;
  bio: string | null;
  posts: IPost[];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserForClient {
  email: string;
  bio: string;
}

export interface UserLoginResponse extends UserForClient {
  token: Secret;
}

export interface UserMethods {
  verifyPassword: (password: string) => boolean;
  setPassword: (password: string) => void;
  generateJWT: () => Secret;
  forClient: () => UserForClient;
}

export type UserModel = Model<UserType, {}, UserMethods>;

export interface IUser extends Document, UserType, UserMethods {}
