import mongoose from "mongoose";
import { logger } from "./logger";

//connect to the database
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?authSource=admin`,
  () => {
    logger.log("info", "Connected to MongoDB instance!");
  },
);
