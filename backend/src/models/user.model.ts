import mongoose, {Document, Schema, Model} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export interface User extends Document {
    fullname: {
        firstname: string,
        lastname: string
    },
    email: string,
    password: string,
    socketId: string,
    generateAuthToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
}

export interface UserModelType extends Model<User> {
    hashPassword(password: string): Promise<string>;
}

const UserSchema: Schema<User> = new Schema({
    fullname:{
        firstname: {
            type: String,
            require: [true, "Enter your name"],
            minLength: [3, "Your name must have 3 characters"]
        },
        lastname:{
            type: String,
            minLength: [3, "Your name must have 3 characters"]
        }
    },
    email:{
        type: String,
        required: [true, "Enter your email"],
    },
    password:{
        type: String,
        required: [true, "Enter your password"],
        select: false,
    },
    socketId:{
        type: String,
    }
})

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET!, {expiresIn: '24h'});
    return token
}

UserSchema.methods.comparePassword = async function(password: string){
    return await bcrypt.compare(password, this.password)
}

UserSchema.statics.hashPassword = async function(password: string){
    return await bcrypt.hash(password, 10)
}

const UserModel = mongoose.model<User, UserModelType>('user', UserSchema);
export default UserModel;