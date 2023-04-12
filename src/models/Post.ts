import { Schema, model } from "mongoose";
import { PostMethods, PostModel, PostType, IPost } from "../@types";

const PostSchema = new Schema<PostType, PostModel, PostMethods>(
  {
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", PostSchema);
