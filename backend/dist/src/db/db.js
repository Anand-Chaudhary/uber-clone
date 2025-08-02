"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dbConnect;
const mongoose_1 = __importDefault(require("mongoose"));
function dbConnect() {
    try {
        mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log(`Connected to Db`);
    }
    catch (err) {
        console.log(`Error connecting to db: ${err}`);
    }
}
//# sourceMappingURL=db.js.map