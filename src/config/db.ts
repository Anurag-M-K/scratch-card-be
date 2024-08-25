import mongoose from "mongoose";

const connectDb = async () => {
  const uri: any = process.env.DATABASE_URL;

  try {
    const connection = await mongoose.connect(uri);
    console.log(`🟢 Mongo db connected:`, connection.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
