import express, { Express } from 'express';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app: Express = express();
const PORT: number = +process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
