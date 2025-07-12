import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import registerRouter from "./routes/register.js";
import connectDB from "./config/dbConn.js";
import authRouter from "./routes/auth.js";
import errorHandler from "./middleware/errorHandler.js";
import verifyJWT from "./middleware/verifyJWT.js";
import refreshRouter from "./routes/refreshToken.js";
import logoutRouter from "./routes/logout.js";
import moviesRouter from "./routes/api/movies.js";
import profileRouter from "./routes/manageProfile.js";
import userRouter from "./routes/api/user.js";

const app = express();
const PORT = 3500;

connectDB();

// Parses JSON into request body
app.use(express.json());
// Parses cookies into request cookies
app.use(cookieParser());

app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);

app.use("/api/movies", moviesRouter);

app.use(verifyJWT);

app.use("/logout", logoutRouter);
app.use("/manage-profile", profileRouter);
app.use("/user", userRouter);

// Not found page
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
