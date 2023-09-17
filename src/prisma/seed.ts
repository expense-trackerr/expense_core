import { CategoryTypeName, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ------ Adds Cateogry Types ------
  const categoryTypes = await prisma.categoryType.findMany();

  if (categoryTypes.length === 0) {
    await prisma.categoryType.createMany({
      data: [
        {
          name: CategoryTypeName.Income,
        },
        {
          name: CategoryTypeName.Expense,
        },
      ],
    });
  }

  // ------ Adds Cateogory Colors ------
  const existingColors = await prisma.categoryColor.findMany();

  if (existingColors.length === 0) {
    await prisma.categoryColor.createMany({
      data: [
        { name: 'Soft Blue', hex_code: '#A5C8FF' },
        { name: 'Pastel Green', hex_code: '#A8E6CF' },
        { name: 'Mellow Yellow', hex_code: '#FFD3B6' },
        { name: 'Blush Pink', hex_code: '#FFAAA5' },
        { name: 'Lavender', hex_code: '#DCCCE7' },
        { name: 'Sky Blue', hex_code: '#ACE4AA' },
        { name: 'Mint Green', hex_code: '#96E6B3' },
        { name: 'Peach', hex_code: '#FFD1A1' },
        { name: 'Rose', hex_code: '#FFA1A1' },
        { name: 'Periwinkle', hex_code: '#C1A1FF' },
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
