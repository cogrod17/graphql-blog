import { Strategy } from "passport-local";
import { User } from "../models";
import { IUser } from "../@types";

export const LocalStrategy = new Strategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const user: IUser | null = await User.findOne({ email });
      if (!user || !user.verifyPassword(password))
        return done(null, false, { message: "incorrect email or passwrod" });

      return done(null, user);
    } catch (e) {
      done(null, false);
    }
  }
);
