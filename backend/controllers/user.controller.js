import UserModel from "../models/user.model.js";
import * as userService from '../services/user.service.js'
import {validationResult} from 'express-validator'

export const registerUser = async (req, res, next) => {
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