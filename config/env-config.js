import dotenv from "dotenv";

const env = dotenv.config();
if (env.error) {
  throw new Error("Couldn't find .env file");
}

export default env;
