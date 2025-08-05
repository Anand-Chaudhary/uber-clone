import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import dbConnect from './db/db';
import morgan from 'morgan'
import cookie from 'cookie-parser'
import userRoute from './routes/user.routes'

const app = express();
dotenv.config()
dbConnect()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie());

app.use('/users', userRoute)

app.get('/', (req, res)=>{
    res.send('Hello world');
})

export default app;