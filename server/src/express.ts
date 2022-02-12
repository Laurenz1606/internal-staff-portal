import cors from "cors";
import express from "express";
import { auth } from "./auth";
import { logger } from "./logger";
import { UserRouter } from "./Routes/User";

//init express app
const app = express();

//default configuration
app.use(express.json());
app.use(cors());

//the auth router
app.use("/auth", auth.Router);

//all routers
app.use("/users", UserRouter);

//listen on the port
app.listen(process.env.PORT, () =>
  logger.log("info", `Express listening on Port ${process.env.PORT}!`),
);
