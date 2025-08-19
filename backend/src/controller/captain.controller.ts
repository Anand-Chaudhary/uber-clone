import { validationResult } from 'express-validator'
import * as captainService from '../service/captain.service'
import { Request, Response } from 'express'
import CaptainModel from '../models/captain.model'
import BlacklistTokenModel from "../models/blacklistToken.model";

export const registerCaptain = async (req: Request, res: Response)=>{
    const error = validationResult(req)
    if (!error.isEmpty()) {
        console.log(error.array());
    }
    const { fullname, email, password, vehicle } = req.body;

    const existingUser = await CaptainModel.findOne({email})

    if(existingUser){
        return res.json({
            success: false,
            message: "User Exists"
        })
    }

    const hashPassword: string = await CaptainModel.hashPassword(password)

    const user = await captainService.registerCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname, 
        email, 
        password: hashPassword,
        vehicleType: vehicle.vehicleType,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity
    });

    const token = user.generateAuthToken();
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
        token
    });
}

export const loginCaptain = async (req: Request, res: Response) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()})
    }

    const { email, password } = req.body;

    const existingCaptain = await CaptainModel.findOne({ email }).select("+password");

    if (!existingCaptain) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const matched = await existingCaptain.comparePassword(password);

    if (!matched) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const token = existingCaptain.generateAuthToken();

    res.cookie('token', token)

    return res.status(201).json({
        success: true,
        message: "Captain Logged In",
        existingCaptain,
        token
    })
}

export const getCaptainProfile = async (req: Request, res: Response) => {
    return res.status(200).json(req.captain)
}

export const logoutCaptain = async (req: Request, res: Response) => {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    const blacklistToken = await BlacklistTokenModel.create({ token })
    await blacklistToken.save()
    return res.status(200).json({ success: true, message: "Captain Logged Out" })
}