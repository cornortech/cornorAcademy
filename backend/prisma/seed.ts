import { PrismaClient } from "@prisma/client";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

async function main() {
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@cornoracademy.com";
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";

  let uid = "";
  try {
    const userRecord = await admin.auth().getUserByEmail(adminEmail);
    uid = userRecord.uid;
    await admin.auth().updateUser(uid, { password: adminPassword });
    console.log(`Updated admin Firebase user password: ${uid}`);
  } catch {
    const userRecord = await admin.auth().createUser({
      email: adminEmail,
      password: adminPassword,
      displayName: "Super Admin",
      emailVerified: true,
    });
    uid = userRecord.uid;
    console.log(`Created admin Firebase user: ${uid}`);
  }

  const existing = await prisma.admin.findFirst({ where: { email: adminEmail } });
  if (!existing) {
    await prisma.admin.create({
      data: { uid, email: adminEmail, name: "Super Admin" },
    });
    console.log("Admin record created in database");
  } else {
    console.log("Admin record already exists");
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
