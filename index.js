import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import clientRouter from './routers/clients.routers.js';
import trasactionsRouter from './routers/transactions.routers.js';

import mongo from './db/db.js'

let db = await mongo();

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();


app.use(clientRouter);
app.use(trasactionsRouter);



app.listen('5001',()=>{console.log('listen on port 5001')});