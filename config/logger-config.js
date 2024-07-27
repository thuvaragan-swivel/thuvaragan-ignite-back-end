import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const LOG_FILE_PATH = process.env.LOG_FILE;

if (!LOG_FILE_PATH) {
  throw new Error("LOG_FILE environment variable is not defined.");
}

const logMessage = (message) => {
  fs.appendFile(
    path.resolve(LOG_FILE_PATH),
    `${new Date().toISOString()} - ${message}\n`,
    (err) => {
      if (err) throw err;
    }
  );
};

const logger = {
  info: (message) => logMessage(`INFO: ${message}`),
  error: (message) => logMessage(`ERROR: ${message}`),
};

export default logger;
