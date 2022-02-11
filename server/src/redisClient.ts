import Redis from "ioredis";
import { logger } from "./logger";

//create the redis client
export const redisClient = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

//listen to the connect event
redisClient.connect(() => {
  logger.log("info", "Connected to Redis instance!");
});
