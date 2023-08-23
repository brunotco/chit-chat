import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const admin = {
  username: 'admin',
  email: 'admin@admin.com',
  name: 'Administrator',
  role: Role.ADMIN,
}

async function main() {
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      ...admin,
      password: await hash('admin', 10),
    },
  });

  console.log(user);
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
