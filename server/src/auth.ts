import Auth from "@authfunctions/express";
import { logger } from "./logger";
import { UserModel } from "./Models/User";
import { redisClient } from "./redisClient";

//new auth instance
export const auth = new Auth({
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || "",
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || "",
  emailValidation: true,
  expiresIn: 900,
  passwordValidation: "Y-Y-Y-Y-8",
});

//use the logger
auth.logger((level, data) => logger.log(level, data));

//get the user by their mail
auth.use("getUserByMail", async ({ email }) => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return [false, null];
    return [
      false,
      {
        email: user.email,
        hashedPassword: user.hashedPassword,
        id: user._id,
        username: user.username,
      },
    ];
  } catch (err) {
    logger.log("error", String(err));
    return [true, null];
  }
});

//get the user by their username
auth.use("getUserByName", async ({ username }) => {
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) return [false, null];
    return [
      false,
      {
        email: user.email,
        hashedPassword: user.hashedPassword,
        id: user._id,
        username: user.username,
      },
    ];
  } catch (err) {
    logger.log("error", String(err));
    return [true, null];
  }
});

//check if a token exists
auth.use("checkToken", async ({ token }) => {
  try {
    const isStored = await redisClient.sismember(
      process.env.REDIS_SET || "",
      token,
    );
    return [false, !!isStored];
  } catch (err) {
    logger.log("error", String(err));
    return [true, null];
  }
});

//store a token
auth.use("storeToken", async ({ token }) => {
  try {
    redisClient.sadd(process.env.REDIS_SET || "", token);
    return [false];
  } catch (err) {
    logger.log("error", String(err));
    return [true];
  }
});

//delete a token
auth.use("deleteToken", async ({ token }) => {
  try {
    redisClient.srem(process.env.REDIS_SET || "", token);
    return [false];
  } catch (err) {
    logger.log("error", String(err));
    return [true];
  }
});

//intercept the login
auth.intercept("login", async ({ id }) => {
  try {
    const user = await UserModel.findById(id);
    if (user?.active) return [false];
    return [true];
  } catch (err) {
    logger.log("error", String(err));
    return [true];
  }
});

//disable register
auth.intercept("register", () => [true]);
