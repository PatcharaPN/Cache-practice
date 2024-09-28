import { createClient } from "redis";

let RedisClient;

const connectRadis = async () => {
  try {
    RedisClient = createClient();

    RedisClient.on("error", (error) => {
      console.error("Error while connecting to Redis", error);
    });

    await RedisClient.connect();
    console.log("Redis connected");
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
};

export { connectRadis, RedisClient };
