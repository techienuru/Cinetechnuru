import dotenv from "dotenv";

dotenv.config();

export const {
  DATABASE_URI,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TMDB_API_KEY,
  TMDB_ACCESS_TOKEN,
} = process.env;
