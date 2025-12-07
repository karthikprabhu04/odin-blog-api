import prisma from '../prisma/client.js'


export async function createUser(req, res) {
  const { username, email } = req.body;

  const user = await prisma.user.create({
    data: { username, email },
  });

  res.status(201).json(user);
}
