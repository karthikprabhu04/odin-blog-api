import express from "express";
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, password: hashed },
  });

  res.json({ message: "User registered", user: { id: user.id, username: user.username } });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = generateToken(user);

  res.json({ message: "Login successful", token });
});

export default router;
