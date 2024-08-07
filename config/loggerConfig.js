import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import winston from 'winston';

dotenv.config();

const LOG_FILE_PATH = process.env.LOG_FILE;

if (!LOG_FILE_PATH) {
  throw new Error("LOG_FILE environment variable is not defined.");
}

// Creating a Winston logger instance.
const logger = winston.createLogger({
  level: 'info', // Default log level.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} - ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: LOG_FILE_PATH }),
    new winston.transports.Console() // Optional: to also log to the console.
  ],
});

// Error handling for transport initialization.
logger.on('error', (err) => {
  console.error('Logger error:', err);
});

export default logger;