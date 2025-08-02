"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db/db"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)();
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello world');
});
exports.default = app;
//# sourceMappingURL=app.js.map