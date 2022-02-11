import cors from "cors";
import express from "express";
import { auth } from "./auth";
import { logger } from "./logger";

//init express app
const app = express();

//default configuration
app.use(express.json());
app.use(cors());

//the auth router
app.use("/auth", auth.Router);

//listen on the port
app.listen(process.env.PORT, () =>
  logger.log("info", `Express listening on Port ${process.env.PORT}!`),
);
