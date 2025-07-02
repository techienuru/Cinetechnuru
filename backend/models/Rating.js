import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ratings", ratingSchema);
