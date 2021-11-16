import getenv from 'getenv';
import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: getenv.int('PORT', 5000),
  DB_URL: getenv.string('DB_URL', 'mongodb://localhost:27017/if_test_db'),
};
