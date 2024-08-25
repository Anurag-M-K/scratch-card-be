import mongoose from "mongoose";

const connectDb = async () => {
  const uri: string | undefined = "mongodb+srv://hashqubes-scratch-card:gGaeNSVBsIMm0uHi@cluster0.q2ktp.mongodb.net/scratch-card-db?retryWrites=true&w=majority&appName=Cluster0";
  if (!uri) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
  }

  const connectionParams: mongoose.ConnectOptions = {
    family: 4,  // Forces the use of IPv4
  };

  try {
    const connection = await mongoose.connect(uri,connectionParams);
    console.log(`🟢 MongoDB connected:`, connection.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
