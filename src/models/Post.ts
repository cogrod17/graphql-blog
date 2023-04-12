import { Schema, model } from "mongoose";
import { PostMethods, PostModel, PostType } from "../@types";

const PostSchema = new Schema<PostType, PostModel, PostMethods>(
  {
    content: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Post = model<PostType, PostModel>("Post", PostSchema);
