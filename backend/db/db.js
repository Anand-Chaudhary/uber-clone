import mongoose from 'mongoose';

const dbConnect = () =>{
    const MONGODB_URI = process.env.MONGODB_URI
     try {
        mongoose.connect(MONGODB_URI)
        .then(()=>{
            console.log(`Database Connected`);
        })
        .catch(err=> console.log(err.message));
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

export default dbConnect;