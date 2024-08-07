import dotenv from "dotenv";
import winston from 'winston';

dotenv.config();

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
    new winston.transports.Console()
  ],
});

// Error handling for transport initialization.
logger.on('error', (err) => {
  console.error('Logger error:', err);
});

export default logger;