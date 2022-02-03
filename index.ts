import dotenv from 'dotenv';
import express, { Express, urlencoded, json } from 'express';
import mongoose from 'mongoose';
import allRoutes from './routes';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app: Express = express();
const PORT: number = +process.env.PORT || 8080;
// const databaseUri: string = process.env.DB_URI;
const databaseUri = 'mongodb://localhost/pcw';

app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/', allRoutes);

mongoose.connect(databaseUri, {}, () => console.log('database connected'));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
