import { MongoError } from "mongodb";
import * as mongoose from "mongoose";
import { appConfigs } from "../config/index";
mongoose.connect(appConfigs.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true },
    (err: MongoError) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Database connected....");
        }
    });
