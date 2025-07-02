import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
});
