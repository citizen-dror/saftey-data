const mongoose = require('mongoose');
const logger = require('./middlewares/logger');

// Make Mongoose use `findOneAndUpdate()` see https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
console.log('mongo:', user, password, dbName);
const dbUrl = `mongodb://${user}:${password}@cluster0-shard-00-00-cf64j.mongodb.net:27017,cluster0-shard-00-01-cf64j.mongodb.net:27017,cluster0-shard-00-02-cf64j.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

class Database {
  constructor() {
    this.connect();
    // global.mongoose = mongoose
  }

  // eslint-disable-next-line class-methods-use-this
  connect() {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        logger.info(`Database name: ${dbName}, connection successful.`);
      })
      .catch((err) => {
        logger.error(err);
      });
  }
}

module.exports = new Database();
