import mongoose from "mongoose";

const connectDb = async (p0?: () => void) => {
  // const uri: any = process.env.DATABASE_URL;
  const uri: any = 'mongodb+srv://hashqubes-scratch-card:gGaeNSVBsIMm0uHi@cluster0.q2ktp.mongodb.net/scratch-card-db?retryWrites=true&w=majority&appName=Cluster0';
  if (!uri) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
  }

  // const connectionParams= {
  //   family: 4,  // Forces the use of IPv4
  //   useNewUrlParser:true,
  //   useUnifiedTopology:true
  // };

  try {
    mongoose.connect(uri)
      
      console.log(`Database connected successfully`);
 
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
