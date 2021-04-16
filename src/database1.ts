import mongoose from 'mongoose';
import logger from './middlewares/logger';
require('dotenv').config();

// Make Mongoose use `findOneAndUpdate()` see https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUrl = `mongodb://${user}:${password}@cluster0-shard-00-00-cf64j.mongodb.net:27017,cluster0-shard-00-01-cf64j.mongodb.net:27017,cluster0-shard-00-02-cf64j.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

//DB Connection
const connect = async () => {
  try {
    if(process.env.NODE_ENV === 'test')
    {
      console.log('test!')
    }
    await mongoose.connect(
      dbUrl,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    logger.info(`Database name: ${dbName}, connection successful.`);
  } catch (err: any) {
    logger.error('Connection to DB Failed', err);
  }
};


const disconnect = () => {
  return mongoose.disconnect();
}

module.exports = { connect, disconnect }
