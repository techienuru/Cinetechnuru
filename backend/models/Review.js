import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

export default mongoose.model("reviews", reviewSchema);
