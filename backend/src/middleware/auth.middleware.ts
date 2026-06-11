import { Request, Response, NextFunction } from "express";
import admin from "../libs/admin";
import prisma from "../libs/db";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        uid: string;
        role: "teacher" | "student" | "admin"
      } | null;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = decodedToken;

    if (!user.email) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const student = await prisma.student.findFirst({ where: { email: user.email } });
    if (student) {
      req.user = { email: user.email, id: student.id, role: "student", uid: user.uid };
      return next();
    }

    const teacher = await prisma.teacher.findFirst({ where: { email: user.email } });
    if (teacher) {
      req.user = { email: user.email, id: teacher.id, role: "teacher", uid: user.uid };
      return next();
    }

    const adminUser = await prisma.admin.findFirst({ where: { email: user.email } });
    if (adminUser) {
      req.user = { email: user.email, id: adminUser.id, role: "admin", uid: user.uid };
      return next();
    }

    return res.status(401).json({ message: "User not found in database" });
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
