import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("admin123", 10); // default password

  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: hashed,
    }
  });

  console.log("Admin user created:", admin);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
