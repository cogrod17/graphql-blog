import { Model, Document } from "mongoose";
import { PublicUser } from "./user";

export type PostType = {
  content: string;
  author_id: PublicUser;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface PostMethods {}

export type PostModel = Model<PostType, {}, PostMethods>;

export interface IPost extends Document, PostMethods, PostType {}
