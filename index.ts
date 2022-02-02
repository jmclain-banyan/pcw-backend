import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";


if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app: Express = express();
const PORT: number = +process.env.PORT || 8080;
// const databaseUri: string = process.env.DB_URI;
const databaseUri = "mongodb://localhost/pcw";

mongoose.connect(databaseUri, {}, () => console.log("database connected"));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
