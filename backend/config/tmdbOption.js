import { TMDB_ACCESS_TOKEN } from "./secretKeys.js";

export default {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TMDB_ACCESS_TOKEN,
  },
};
