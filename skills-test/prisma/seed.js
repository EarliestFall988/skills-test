import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";

const CreateApplicant = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    driversLicense: "k-" + faker.string.numeric({ length: 5 }),
    imageUrl: faker.image.avatar(),
  };
};

/**
 * @param  {number} amt
 */
const CreateApplicants = (amt) => {
  const users = [];

  for (let i = 0; i < amt; i++) {
    const newUser = CreateApplicant();
    users.push(newUser);
  }

  return users;
};

const main = async () => {
  await prisma.applicant.deleteMany();
  const applicants = CreateApplicants(50);
  await prisma.applicant.createMany({
    data: applicants,
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
