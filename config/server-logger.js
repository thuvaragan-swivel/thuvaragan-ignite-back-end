import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const LOG_DATA = process.env.LOG_FILE;

const logMessage = (message) => {
  fs.appendFile(
    path.resolve(LOG_DATA),
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
