"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    jwtSecret: process.env.JWT_SECRET || "scratch-card",
    port: process.env.PORT || 4000,
};