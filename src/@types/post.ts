import {
  Model,
  Document,
  HydratedDocument,
  SchemaDefinitionProperty,
  ObjectId,
} from "mongoose";

export type PostType = {
  content: string;
  author: SchemaDefinitionProperty<ObjectId>;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface PostMethods {}

export type PostModel = Model<PostType, {}, PostMethods>;

export interface IPost extends Document, PostMethods, PostType {}

export interface PostRes extends Promise<IPost | Error> {}

export interface GetPostsArgs {
  page?: number;
  limit?: number;
  keyword?: string;
  userId?: ObjectId;
}

export type GetPostsReturn = {
  posts: HydratedDocument<IPost>[];
  page: number;
  limit: number;
  count: number;
};
