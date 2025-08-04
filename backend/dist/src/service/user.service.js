"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }
    const user = await user_model_1.default.create({
        fullname: {
            firstname, lastname
        },
        email,
        password
    });
    return user;
};
exports.createUser = createUser;
//# sourceMappingURL=user.service.js.map