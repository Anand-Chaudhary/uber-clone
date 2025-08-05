import UserModel, { User } from "../models/user.model";
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import BlacklistTokenModel from "../models/blacklistToken.model";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}


export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message: "User not authorized"
        })
    }

    const isBlackListed = await BlacklistTokenModel.findOne({token})

    if(isBlackListed){
        return res.status(401).json({
            success: false,
            message: "User not authorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "User not authorized"
        });
    }
}