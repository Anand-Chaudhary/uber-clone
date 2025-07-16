import express, { urlencoded } from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import morgan from "morgan";
import dbConnect from "./db/db.js";
import userRoute from './routes/user.routes.js'

dotenv.config();
dbConnect();

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(urlencoded({extended: true}))
app.use('/user', userRoute)

app.get('/', (req, res)=>{
    res.send("Hello World!!")
})

export default app;