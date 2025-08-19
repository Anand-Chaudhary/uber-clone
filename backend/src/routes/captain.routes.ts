import express from "express";
import {body} from 'express-validator'
import * as captainController from '../controller/captain.controller'
import { authCaptain } from "../middlewares/auth.middleware";

const router = express.Router()

router.post('/register',
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('fullname.firstname').isLength({min: 3}).withMessage("Your name must have 3 characters"),
        body('password').isLength({min: 6}).withMessage("Paswword must be of 6 characters"),
        body('vehicle.color').isLength({min: 3}).withMessage("Vehicle color must be of 3 characters"),
        body('vehicle.plate').isLength({min: 3}).withMessage("Vehicle plate must be of 3 characters"),
        body('vehicle.vehicleType').isLength({min: 3}).withMessage("Vehicle type must be of 3 characters"),
        body('vehicle.capacity').isLength({min: 3}).withMessage("Vehicle capacity must be of 3 characters"),
    ],
    captainController.registerCaptain
)

router.post('/login',
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({min: 6}).withMessage("Pswword must be of 6 characters")
    ],
    captainController.loginCaptain
)

router.get('/profile', authCaptain, captainController.getCaptainProfile)

router.get('/logout', authCaptain, captainController.logoutCaptain)

export default router