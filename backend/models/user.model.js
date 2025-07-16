import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            requied: true,
            minLength: [3, "Username must be of 3 characters atleast"]
        },
        lastName: {
            type: String,
            requied: true,
            minLength: [3, "Username must be of 3 characters atleast"]
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Give a valid email"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id: this._id},
        process.env.JWT_SECRET
    )
    return token;
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}


const UserModel = mongoose.model('user', userSchema)

export default UserModel;