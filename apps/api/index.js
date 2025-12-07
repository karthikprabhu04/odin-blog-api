import express from "express";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import usersRouter from "./routes/users.js";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Auth
app.use("/auth", authRouter);

// Routes
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);

// console.log("Loading comments router...");

app.listen(3000, () => console.log("API running on http://localhost:3000"));