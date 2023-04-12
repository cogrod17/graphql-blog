import mongoose, { ConnectOptions } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const options: ConnectOptions = {};

const USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const dbName = process.env.NODE_ENV || "dev";

export const initDB = () =>
  mongoose
    .connect(
      `mongodb+srv://${USER}:${DB_PASSWORD}@cluster0.1vvhhha.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      options
    )
    .then((res) => console.log("database connected"))
    .catch((err) => console.log("error connecting to database"));
