import { config } from "dotenv";

//load env vars (development only)
if (process.env.NODE_ENV !== "production") {
  config();
}

//load core modules
import "./mongoose";
import "./express";