import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("error while connecting to MongoDB");
    process.exit(1);
  }
};
export default connectDB;
