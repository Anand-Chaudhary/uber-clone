import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import morgan from "morgan";
import dbConnect from "./db/db.js";

dotenv.config();
dbConnect();

const app = express();

app.use(cors());
app.use(morgan('dev'))

app.get('/', (req, res)=>{
    res.send("Hello World!!")
})

export default app;