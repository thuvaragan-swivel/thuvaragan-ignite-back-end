import mongoose from 'mongoose';
import connectDB from '../config/mongoConfig.js'; // Update with the correct path
import logger from '../config/loggerConfig.js'; // Update with the correct path


// Mock the mongoose and logger modules
jest.mock('mongoose');
jest.mock('../config/loggerConfig.js'); // Ensure this path is correct

describe('MongoDB Configuration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls
  });

  it('should connect to MongoDB successfully', async () => {
    // Mock the successful connection
    mongoose.connect.mockResolvedValueOnce();

    // Mock the logger methods
    logger.info.mockImplementation(() => {});
    logger.error.mockImplementation(() => {});

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URL);
    expect(logger.info).toHaveBeenCalledWith('MongoDB Database has been Connected Successfully.');
  });

  it('should handle MongoDB connection errors', async () => {
    // Mock the connection error
    mongoose.connect.mockRejectedValueOnce(new Error('Connection error'));

    // Mock the logger methods
    logger.info.mockImplementation(() => {});
    logger.error.mockImplementation(() => {});

    // Use expect().rejects to handle the async error
    await expect(connectDB()).rejects.toThrow('Connection error');

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URL);
    expect(logger.error).toHaveBeenCalledWith('Error connecting to MongoDB: Connection error.');
  });
});