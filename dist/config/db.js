"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    const uri = 'mongodb://localhost:27017/scratch-card';
    // const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.9';
    try {
        const connection = await mongoose_1.default.connect(uri);
        console.log(`🟢 Mongo db connected:`, connection.connection.host);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.default = connectDb;
