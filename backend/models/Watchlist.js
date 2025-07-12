import mongoose from "mongoose";

const { Schema } = mongoose;

const watchlistSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("watchlists", watchlistSchema);
