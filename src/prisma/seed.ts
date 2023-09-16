import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categoryTypes = await prisma.categoryType.findMany();

  if (categoryTypes.length === 0) {
    await prisma.categoryType.createMany({
      data: [
        {
          name: 'Income',
        },
        {
          name: 'Expense',
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
