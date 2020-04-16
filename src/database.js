const mongoose = require('mongoose');

const user = 'nodejsuser1';
const password = 'nodejs2020';
const dbName = 'test';
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
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = new Database();
