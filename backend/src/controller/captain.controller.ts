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
    const normalizedEmail = (email as string).toLowerCase().trim();

    const existingUser = await CaptainModel.findOne({ email: normalizedEmail })

    if(existingUser){
        return res.json({
            success: false,
            message: "User Exists"
        })
    }

    const hashPassword: string = await CaptainModel.hashPassword(password)

    let user;
    try {
        user = await captainService.registerCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname, 
            email: normalizedEmail, 
            password: hashPassword,
            vehicleType: vehicle.vehicleType,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity
        });
    } catch (err: any) {
        if (err?.code === 11000 && err?.keyPattern?.email) {
            return res.status(409).json({ success: false, message: "User Exists" });
        }
        throw err;
    }

    const token = user.generateAuthToken();
    const safeCaptain = user.toObject();
    delete (safeCaptain as any).password;
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: safeCaptain,
        token
    });
}

export const loginCaptain = async (req: Request, res: Response) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()})
    }

    const { email, password } = req.body;
    const normalizedEmailLogin = (email as string).toLowerCase().trim();

    const existingCaptain = await CaptainModel.findOne({ email: normalizedEmailLogin }).select("+password");

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

    const safeCaptain = existingCaptain.toObject();
    delete (safeCaptain as any).password;
    return res.status(201).json({
        success: true,
        message: "Captain Logged In",
        existingCaptain: safeCaptain,
        token
    })
}

export const getCaptainProfile = async (req: Request, res: Response) => {
    if (!req.captain) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const safeCaptain = req.captain.toObject();
    delete (safeCaptain as any).password;
    return res.status(200).json(safeCaptain)
}

export const logoutCaptain = async (req: Request, res: Response) => {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    const blacklistToken = await BlacklistTokenModel.create({ token })
    await blacklistToken.save()
    return res.status(200).json({ success: true, message: "Captain Logged Out" })
}