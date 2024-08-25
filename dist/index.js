"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const var_1 = require("./config/var");
const shopOwnerRoutes_1 = __importDefault(require("./routers/shopOwnerRoutes"));
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api", shopOwnerRoutes_1.default);
const PORT = var_1.config.port || 4000;
app.listen(PORT, () => console.log(`API server listening at ${PORT}`));
