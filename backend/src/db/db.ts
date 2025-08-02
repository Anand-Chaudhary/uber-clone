import mongoose from "mongoose";

export default function dbConnect(){
    try{
        mongoose.connect(process.env.MONGODB_URI!);
        console.log(`Connected to Db`)
    } catch(err){
        console.log(`Error connecting to db: ${err}`);
    }
}