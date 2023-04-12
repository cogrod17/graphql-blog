import { HydratedDocument } from "mongoose";
import { IUser } from "../../@types";
import { User } from "../../models";
import { Request } from "express-jwt";

interface IUserService {
  getUser: (
    args: { email: string; auth: unknown },
    req: Request
  ) => Promise<HydratedDocument<IUser> | Error>;
  getAllUsers: () => Promise<HydratedDocument<IUser>[] | Error>;
  deleteUser: (
    args: { userId: string },
    req: Request
  ) => Promise<HydratedDocument<IUser> | Error>;
  updateUser: (
    args: {
      email: string;
      bio: string;
    },
    req: Request
  ) => Promise<HydratedDocument<IUser> | Error>;
}

export const userResolver: IUserService = {
  getUser: async (args, { auth }) => {
    if (!auth?.id) return new Error("Auth Required");
    const user: HydratedDocument<IUser> | null = await User.findOne({
      email: args.email,
    });
    if (!user) throw new Error("No user found");
    return user;
  },
  getAllUsers: async () => await User.find(),
  updateUser: async (updates, { auth }) => {
    if (!auth?.id) return new Error("Auth required");

    if (!Object.keys(updates).length) return new Error("Nothing to update");

    const user = await User.findOneAndUpdate({ _id: auth?.id }, updates, {
      new: true,
    });
    if (!user) return new Error("There was an error");

    user.save();

    return user;
  },
  deleteUser: async ({ userId }, { auth }) => {
    if (!auth?.id) return new Error("Auth Required");
    if (!userId) return new Error("Need to have user id");
    const user: HydratedDocument<IUser> | null = await User.findById(auth.id);
    if (!user) throw new Error("No user found");
    user.deleteOne();
    return user;
  },
};
