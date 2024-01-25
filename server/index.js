import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

// import express from "express"


// npm i fluent-ffmpeg
const app = express();
dotenv.config();
//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.static('public'));


mongoose.set('strictQuery', false);







app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
// app.use("/api/newvideos", videoRoutes);
app.use("/api/comments", commentRoutes);

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((err) => {
      throw err;
    });
};

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});


// const app = express();
// const port = 3000;




app.listen(8800, () => {
  connect();
  console.log("Connected to Server!! 8800");
});
