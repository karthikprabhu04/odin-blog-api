import express from "express";
import prisma from "../prisma/client.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// protected route
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;

  const article = await prisma.article.create({
    data: {
      title,
      content,
      authorId: req.user.id,
    },
  });

  res.json(article);
});

export default router;
