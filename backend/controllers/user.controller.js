import UserModel from "../models/user.model.js";
import * as userService from '../services/user.service.js'
import {validationResult} from 'express-validator'

export const registerUser = async (req, res) => {
    const error = validationResult(req)

    if(!error.isEmpty){
        return res.status(400).json({ error: error.array() })
    }
 
    const {fullName, email, password} = req.body;

    const hashedPassword = await UserModel.hashPassword(password)
    
    const user = await userService.createUser({firstName: fullName.firstName, lastName:fullName.lastName, email, password: hashedPassword})
  
    const token = user.generateAuthToken();

    return res.status(200).json({
        token,
        user,
        message: "User Registered"
    });
};

export const loginUser = async (req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return res.status(400).json({errors: error.array()});
    }

    const {email, password} = req.body;

    const user = await UserModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const token = await user.generateAuthToken();

    return res.status(200).json({
        token,
        user,
        message: "Successfully logged in"
    })
}