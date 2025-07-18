import mongoose from "mongoose";
import { DATABASE_URI } from "./secretKeys.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
