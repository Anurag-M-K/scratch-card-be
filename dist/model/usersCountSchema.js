"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
