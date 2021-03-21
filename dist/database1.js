"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./middlewares/logger"));
// Make Mongoose use `findOneAndUpdate()` see https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUrl = `mongodb://${user}:${password}@cluster0-shard-00-00-cf64j.mongodb.net:27017,cluster0-shard-00-01-cf64j.mongodb.net:27017,cluster0-shard-00-02-cf64j.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
class Database {
    constructor() {
        this.connect();
        // global.mongoose = mongoose
    }
    // eslint-disable-next-line class-methods-use-this
    connect() {
        mongoose_1.default.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
            logger_1.default.info(`Database name: ${dbName}, connection successful.`);
        })
            .catch((err) => {
            logger_1.default.error(err);
        });
    }
}
module.exports = new Database();
//# sourceMappingURL=database1.js.map