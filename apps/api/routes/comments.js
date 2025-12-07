console.log("Comments router loaded");

import express from "express";
import {
  createComment,
  deleteComment,
} from "../controllers/commentsController.js";

const router = express.Router();

router.post("/", createComment);
router.delete("/:id", deleteComment);

router.get("/test", (req, res) => res.send("OK comments route"));


export default router;
