import { Request } from "express-jwt";
import {
  IPost,
  GetPostsReturn,
  PostRes,
  GetPostsArgs,
  IUser,
} from "../../@types";
import { Post, User } from "../../models";
import { HydratedDocument } from "mongoose";

interface IPostResolver {
  createPost: (args: { content: string }, req: Request) => PostRes;
  getPosts: (args: GetPostsArgs) => Promise<GetPostsReturn | Error>;
  getPostsByUser: (args: {
    id: string;
  }) => Promise<{ posts: IPost[]; count: number; user: IUser } | Error>;
  updatePost: (
    args: { postId: string; content: string },
    req: Request
  ) => PostRes;
  deletePost: (args: { postId: string }, req: Request) => PostRes;
}

export const postResolver: IPostResolver = {
  createPost: async ({ content }, { auth }) => {
    if (!auth?.id) return new Error("Auth Required");
    const post: HydratedDocument<IPost> = new Post({
      content,
      author: auth.id,
    });
    try {
      await post.save();
      return post.populate("author");
    } catch (e: any) {
      return new Error(e);
    }
  },
  getPosts: async ({ page = 1, limit = 10, keyword = "" }) => {
    const posts: HydratedDocument<IPost>[] = await Post.find({
      content: { $regex: keyword },
    })
      .populate("author")
      .limit(limit)
      .skip((page - 1) * limit);

    const count = posts.length;

    return { posts, count, page, limit };
  },
  getPostsByUser: async ({ id = null }) => {
    const user: HydratedDocument<IUser> | null = await User.findOne({
      _id: id,
    }).populate("posts");
    if (!user) return new Error("No User found");

    return { posts: user.posts, user, count: user.posts.length };
  },
  updatePost: async ({ postId, content }, { auth }) => {
    if (!auth?.id) return new Error("Auth Required");
    const post: HydratedDocument<IPost> | null = await Post.findOneAndUpdate(
      { $and: [{ _id: postId }, { author: auth.id }] },
      { content },
      { new: true }
    );
    if (!post) return new Error("No post found");
    await post.save();
    return post.populate("author");
  },
  deletePost: async ({ postId }, { auth }) => {
    if (!auth?.id) return new Error("Auth Required");
    const post: HydratedDocument<IPost> | null = await Post.findOneAndDelete({
      $and: [{ _id: postId }, { author: auth.id }],
    });
    if (!post) return new Error("No post found");
    return post;
  },
};
