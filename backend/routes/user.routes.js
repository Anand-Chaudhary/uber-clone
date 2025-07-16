import express from 'express'
import { body } from 'express-validator'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullName.firstName').isLength({ min: 3 }).withMessage('Username must be of 3 characters'),
        body('password').isLength({ min: 3 }).withMessage("Password must be of 3 characters")
    ],
    userController.registerUser
);

router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 3 }).withMessage("Password must be of 3 characters")
    ],
    userController.loginUser
)

export default router;