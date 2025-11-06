import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function connectToDatabase() {
  await prisma.$connect();
  console.log("✅ Connected to Postgres");
};

export default prisma;