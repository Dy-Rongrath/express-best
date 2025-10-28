import mongoose from 'mongoose';
import { config } from '../config/index.js';
import { logger } from '../config/logger.js';

export async function connectMongo() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri);
  logger.info('Mongo connected');
}

export async function disconnectMongo() {
  await mongoose.disconnect();
}
