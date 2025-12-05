import prisma from './../../../prisma/client.js'

export async function createComment(req, res) {
  const { content, authorId, postId } = req.body;

  const comment = await prisma.comment.create({
    data: { content, authorId, postId },
  });

  res.status(201).json(comment);
}

export async function deleteComment(req, res) {
  await prisma.comment.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: "Comment deleted" });
}
