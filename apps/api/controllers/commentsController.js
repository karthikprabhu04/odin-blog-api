import prisma from '../prisma/client.js'

export async function createComment(req, res) {
  try {
    let { name, content, postId } = req.body;
    postId = Number(postId);

    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }

    if (!name || !content) {
      return res.status(400).json({ error: "Name and content are required" });
    }

    const comment = await prisma.comment.create({
      data: {
        name,
        content,
        postId
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment" });
  }
}



export async function deleteComment(req, res) {
  await prisma.comment.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: "Comment deleted" });
}
