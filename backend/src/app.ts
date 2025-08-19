import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import dbConnect from './db/db';
import morgan from 'morgan'
import cookie from 'cookie-parser'
import userRoute from './routes/user.routes'
import captainRoute from './routes/captain.routes'

const app = express();
dotenv.config()
dbConnect()

app.use(cors({
    origin: `http://localhost:3000`,
    methods: `GET, POST, PUT, PATCH, DELETE`,
    credentials: true
}))

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie());

app.use('/users', userRoute)
app.use('/captain', captainRoute)

app.get('/', (req, res)=>{
    res.send('Hello world');
})

export default app;