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
  transports: [new winston.transports.Console()],
});

// Error handling for transport initialization.
logger.on("error", (err) => {
  handleLoggerError(err);
});

const handleLoggerError = (err) => {
  let loggerErrors = [];
  loggerErrors.push({
    message: `Logger error: ${err.message}`,
    timestamp: new Date().toISOString(),
  });
};

export default logger;
