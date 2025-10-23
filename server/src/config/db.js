import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Successfully connect MONGO_DB on host: ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errors occured while connecting MONGO_DB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
