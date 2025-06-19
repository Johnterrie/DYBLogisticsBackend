import 'dotenv/config';

import mongoose from 'mongoose';
import config from '../../../config/env/index.js'; 
import { constants, genericErrors } from '../../utils/index.js';

const { databaseError } = genericErrors
const { DB_SUCCESS } = constants

const connectDB = async () => {
  try {  
    await mongoose.connect(config.MONGO_URI)
    logger.info(DB_SUCCESS)
  } catch (error) {
    logger.info(databaseError, error)
    process.exit(1)
  }
}

export default connectDB