import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
    name: 'Administrator',
    password: 'pass',
    role: Role.ADMIN
  }
]

async function main() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
