import mongoose from "mongoose";

const { Schema } = mongoose;

const favSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("favorites", favSchema);
