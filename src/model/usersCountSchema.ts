import { Schema, model } from "mongoose";

export interface IUsers
 {
     phoneNumber: string;
    }
    
    const userSchema = new Schema<IUsers>({
        phoneNumber: {
            type: String,
            required: true,
        },
    },
    {
        timestamps:true
}

);


const User = model<IUsers>('users',userSchema)

export default User;