import UserModel from "../models/user.model";
import * as userService from '../service/user.service'
import { validationResult } from 'express-validator'
import { Request, Response } from 'express';
import BlacklistTokenModel from "../models/blacklistToken.model";

export const registerUser = async (req: Request, res: Response) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        throw new Error("Errors")
    }
    const { fullname, email, password } = req.body;

    const hashPassword: string = await UserModel.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname, 
        email, 
        password: hashPassword
    });

    const token = user.generateAuthToken();
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
        token
    });
}

export const loginUser = async (req: Request, res: Response) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()})
    }

    const {email, password} = req.body;

    const existingUser = await UserModel.findOne({email}).select("+password");

    if(!existingUser){
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const matched = await existingUser.comparePassword(password);

    if(!matched){
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const token = existingUser.generateAuthToken();

    res.cookie('token', token)

    return res.status(201).json({
        success: true,
        message: "User Logged In",
        existingUser,
        token
    })
}

export const getUserProfile =  async (req: Request, res: Response) =>{
    return res.status(200).json(req.user)
}

export const logoutUser = async (req: Request, res: Response) =>{
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    const blacklistToken = await BlacklistTokenModel.create({token})
    await blacklistToken.save()
    return res.status(200).json({success: true, message: "User Logged Out"})
}