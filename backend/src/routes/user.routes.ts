import express from 'express'
import { body } from 'express-validator';
import * as userController from '../controller/user.controller'
import { authUser } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register',
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('fullname.firstname').isLength({min: 3}).withMessage("Your name must have 3 characters"),
        body('password').isLength({min: 6}).withMessage("Pswword must be of 6 characters")
    ],
    userController.registerUser
)

router.post('/login',
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({min: 6}).withMessage("Pswword must be of 6 characters")
    ],
    userController.loginUser
)

router.get('/profile', authUser, userController.getUserProfile)

router.get('/logout', authUser, userController.logoutUser)

export default router