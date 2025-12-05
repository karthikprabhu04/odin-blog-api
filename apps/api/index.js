import express from "express";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);

app.listen(3000, () => console.log("API running on http://localhost:3000"));