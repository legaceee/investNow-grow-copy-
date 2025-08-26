// redisClient.js
import Redis from "ioredis";

const publisher = new Redis();
const subscriber = new Redis();

export { publisher, subscriber };
