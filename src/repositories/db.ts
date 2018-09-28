import { MongoError } from "mongodb";
import * as mongoose from "mongoose";
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true },
    (err: MongoError) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Database connected....");
        }
    });
