import { Request } from "express-jwt";
import { IPost } from "../../@types";
import { Post } from "../../models";

interface Res extends Promise<IPost | Error> {}

interface IPostResolver {
  createPost: (args: { content: string }, req: Request) => Res;
  getPost: () => Res;
  updatePost: () => Res;
  deletePost: () => Res;
}

export const postResolver: IPostResolver = {
  createPost: async ({ content }, { auth }) => {
    if (!auth?.id) return new Error("Auth Required");
    const post = await Post.create({
      content,
      author_id: auth.id,
    });
    await post.save();
    return post;
  },
  getPost: async () => {
    return new Error("somehting happpened");
  },
  updatePost: async () => {
    return new Error("somehting happpened");
  },
  deletePost: async () => {
    return new Error("somehting happpened");
  },
};
