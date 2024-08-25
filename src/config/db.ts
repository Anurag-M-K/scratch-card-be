import mongoose from "mongoose";

const connectDb = async () => {
  const uri: string | undefined = process.env.DATABASE_URL;
  if (!uri) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(uri);
    console.log(`🟢 MongoDB connected:`, connection.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
