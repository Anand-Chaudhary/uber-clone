import UserModel from "../models/user.model.js";

export const createUser = async ({
    firstName, lastName, email, password
})=>{
    if(!firstName || !lastName || !email || !password){
        throw new Error("Please fill all the feilds")
    }

    const user = await UserModel.create({
        fullName: {
            firstName, lastName
        },
        email,
        password
    })
    return user;
}