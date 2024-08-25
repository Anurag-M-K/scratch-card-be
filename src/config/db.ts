import mongoose from "mongoose";

const connectDb = async () => {
  const uri: any = process.env.DATABASE_URL;
  const connectionParams:any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    const connection = await mongoose.connect(uri, connectionParams);
    console.log(`🟢 Mongo db connected:`, connection.connection.host);
  } catch (error) {
    console.log("mongodb connection error", error);
    process.exit(1);
  }
};

export default connectDb;
