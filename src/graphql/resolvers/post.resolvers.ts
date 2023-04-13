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

interface HydratedPost extends HydratedDocument<IPost> {}

type CreatePost = (args: { content: string }, req: Request) => PostRes;
const createPost: CreatePost = async ({ content }, { auth }) => {
  if (!auth?.id) return new Error("Auth Required");
  const post: HydratedPost = new Post({
    content,
    author: auth.id,
  });
  try {
    await post.save();
    return post.populate("author");
  } catch (e: any) {
    return new Error(e);
  }
};

type GetPosts = (args: GetPostsArgs) => Promise<GetPostsReturn | Error>;
const getPosts: GetPosts = async ({ page = 1, limit = 10, keyword = "" }) => {
  const posts: HydratedPost[] = await Post.find({
    content: { $regex: keyword },
  })
    .populate("author")
    .limit(limit)
    .skip((page - 1) * limit);

  const count = posts.length;

  return { posts, count, page, limit };
};

type GetPostsByUser = (args: {
  id: string;
}) => Promise<{ posts: IPost[]; count: number; user: IUser } | Error>;
const getPostsByUser: GetPostsByUser = async ({ id = null }) => {
  const user: HydratedDocument<IUser> | null = await User.findOne({
    _id: id,
  }).populate("posts");
  if (!user) return new Error("No User found");

  return { posts: user.posts, user, count: user.posts.length };
};

type UpdatePost = (
  args: { postId: string; content: string },
  req: Request
) => PostRes;
const updatePost: UpdatePost = async ({ postId, content }, { auth }) => {
  if (!auth?.id) return new Error("Auth Required");
  const post: HydratedPost | null = await Post.findOneAndUpdate(
    { $and: [{ _id: postId }, { author: auth.id }] },
    { content },
    { new: true }
  );
  if (!post) return new Error("No post found");
  await post.save();
  return post.populate("author");
};

type DeletePost = (args: { postId: string }, req: Request) => PostRes;
const deletePost: DeletePost = async ({ postId }, { auth }) => {
  if (!auth?.id) return new Error("Auth Required");
  const post: HydratedPost | null = await Post.findOneAndDelete({
    $and: [{ _id: postId }, { author: auth.id }],
  });
  if (!post) return new Error("No post found");
  return post;
};

export const postResolver = {
  createPost,
  getPosts,
  getPostsByUser,
  updatePost,
  deletePost,
};
