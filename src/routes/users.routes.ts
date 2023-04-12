import { Router } from "express";
import { CreateUserType, IUser, ReqWithBody } from "../@types";
import { User } from "../models";
import { auth } from "../middleware";
import passport from "passport";
import { IVerifyOptions } from "passport-local";

const router = Router();

router.get("/users", auth.required, async (req, res) => {
  const users: IUser[] = await User.find();
  return res.send({ users });
});

router.post("/user/create", async (req: ReqWithBody<CreateUserType>, res) => {
  try {
    const user: IUser = new User();
    user.email = req.body.email;
    user.setPassword(req.body.password);
    await user.save();
    return res.send({ ...user.forClient() });
  } catch (e) {
    return res.status(500).send();
  }
});

router.post(
  "/user/login",
  async (req: ReqWithBody<CreateUserType>, res, next) => {
    if (!req.body.email || !req.body.password)
      return res.status(422).send({ error: "email and password required" });

    passport.authenticate(
      "local",
      { session: false },
      (err: Error, user: IUser, info: IVerifyOptions) => {
        if (err) return res.status(400).send({ error: err });

        // const
        if (user) return res.send({ user, token: user.generateJWT() });

        return res.status(400).send(info);
      }
    )(req, res, next);
  }
);

router.get("/user", auth.required, async (req, res) => {
  // const user: IUser | null = await User.findById(req.auth?.id);
  const user: IUser | null = await User.findById("asdf");
  if (!user) return res.status(404).send();
  return res.send({ ...user.forClient() });
});

export { router as UserRouter };
