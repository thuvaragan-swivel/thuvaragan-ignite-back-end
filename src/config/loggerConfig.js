import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

// Initializing an empty array for transports.
const transports = [];

// Adding file logging if not in a serverless environment.
if (
  process.env.NODE_ENV !== "production" &&
  process.env.VERCEL_ENV === undefined
) {
  transports.push(
    new winston.transports.File({ filename: "logs/back-end.log" })
  );
} // This has been done, since Vercel deployment crashes when using external file logging, since the environment is serverless.
// In serverless environments, there is no persistent file system available, meaning, writing logs to files cannot be done as it could be on a traditional server.

const logger = winston.createLogger({
  level: "info", // Default log level.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} - ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports,
});

// Checking on transports for logging.
if (transports.length === 0) {
  console.warn("No Logging Transport is Configured.");
}

export default logger;
