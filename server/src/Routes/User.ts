import { Router } from "express";
import { UserModel } from "../Models/User";
import { auth } from "../auth";
import { sendData } from "@authfunctions/express";

export const UserRouter = Router();

UserRouter.get("/", auth.validateMiddleware, async (req, res) => {
  const user = await UserModel.findById(res.locals.payload.id);
  sendData(res, 200, {
    username: user?.username,
    email: user?.email,
    _id: user?._id,
  });
});
