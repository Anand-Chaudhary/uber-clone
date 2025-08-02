import UserModel, { User } from "../models/user.model";

interface CreateUser{
    firstname: string
    lastname: string
    email: string
    password: string
}

export const createUser = async ({firstname, lastname, email, password}: CreateUser): Promise<User>=>{
    if(!firstname || !email || !password){
        throw new Error("All fields are required");
    }
    const user = await UserModel.create({
        fullname:{
            firstname, lastname
        },
        email,
        password
    })
    return user
}