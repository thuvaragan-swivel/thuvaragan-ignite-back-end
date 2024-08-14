import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

// Creating a Winston logger instance.
const logger = winston.createLogger({
  level: "info", // Default log level.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} - ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "logs/back-end.log" }), // Log to a file
  ],
});

export default logger;
