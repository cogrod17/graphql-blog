import { User } from "../../models";
import { CreateUserType, IUser } from "../../@types";

export const authResolvers = {
  createUser: async (args: CreateUserType) => {
    try {
      const user = new User();
      user.email = args.email;
      user.setPassword(args.password);
      await user.save();
      return {
        _id: user?._id,
        email: user.email,
        bio: user.bio,
        token: user.generateJWT(),
      };
    } catch (err) {
      return err;
    }
  },
  login: async (
    args: { email: string; password: string },
    x: unknown,
    y: unknown
  ) => {
    if (!args.email || !args.password)
      throw new Error("Email and password required");

    const user: IUser | null = await User.findOne({ email: args.email });

    if (!user || !user.verifyPassword(args.password))
      throw new Error("Incorrect email or password");
    return {
      _id: user._id,
      email: user.email,
      bio: user.bio,
      token: user.generateJWT(),
    };
  },
};
