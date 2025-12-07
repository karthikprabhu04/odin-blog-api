import prisma from '../prisma/client.js'

// GET /posts
export async function getPosts(req, res) {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true },
  });
  res.json(posts);
}

// GET /posts/:id
export async function getPostById(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: true, comments: true },
  });

  if (!post) return res.status(404).json({ error: "Post not found" });

  res.json(post);
}

// POST /posts
export async function createPost(req, res) {
  const { title, content, authorId, published } = req.body;

  const post = await prisma.post.create({
    data: { title, content, authorId, published },
  });

  res.status(201).json(post);
}

// PUT /posts/:id
export async function updatePost(req, res) {
  const post = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });

  res.json(post);
}

// DELETE /posts/:id
export async function deletePost(req, res) {
  await prisma.post.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: "Post deleted" });
}
