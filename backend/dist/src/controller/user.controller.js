"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const userService = __importStar(require("../service/user.service"));
const express_validator_1 = require("express-validator");
const registerUser = async (req, res) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        throw new Error("Errors");
    }
    const { fullname, email, password } = req.body;
    const hashPassword = await user_model_1.default.hashPassword(password);
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
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    const existingUser = await user_model_1.default.findOne({ email }).select("+password");
    if (!existingUser) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    const matched = await existingUser.comparePassword(password);
    if (!matched) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    const token = existingUser.generateAuthToken();
    return res.status(201).json({
        success: true,
        message: "User Logged In",
        existingUser,
        token
    });
};
exports.loginUser = loginUser;
//# sourceMappingURL=user.controller.js.map