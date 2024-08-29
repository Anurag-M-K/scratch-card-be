import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IStore {
  _id: string;
  username: string;
  password: string;
  generateAuthToken: (userId: string) => string;
}

const userSchema = new Schema<IStore>(
  {
    username: {
      type: String,
    },
   
    password: {
      type: String,
      required: true,
    },
    
  },
 
);

// generate auth token
userSchema.methods.generateAuthToken = function (userId: string): string {
  const jwte ="istore"
  return jwt.sign({ _id: userId }, jwte, { expiresIn: "500d" });
};

const Store = model<IStore>("stores", userSchema);

export default Store;
