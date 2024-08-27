// src/index.ts
import express from "express";
require("dotenv").config();
import dotenv from "dotenv";

dotenv.config();

import connectDb from "./config/db";
import cors from "cors";
import { config } from "./config/var";
import shopOwnerRoutes from "./routers/shopOwnerRoutes";
const app = express();

connectDb(()=>{
  try {
      console.log('Database successfully connected')
  } catch (error) {
      console.log('Database not connected',error)
      
  }
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", shopOwnerRoutes);

const PORT = config.port || 4000;
app.listen(PORT, () => console.log(`API server listening at ${PORT}`));
