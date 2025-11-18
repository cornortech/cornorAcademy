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
            } | null,
        }
    }
};

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    console.log(req.headers);
    // console.log("Authenticating user with token:", token);

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const user = decodedToken;

        if (!user.email) {

            return res.status(401).json({ message: "Invalid or expired token" });

        };

        const studentExist = await prisma.student.findFirst({
            where: {
                email: user.email
            },
        });

        if (studentExist) {
            if (typeof studentExist.dob !== "string") {
                studentExist.dob = new Date(studentExist.dob).toISOString().split("T")[0];
              }
            req.user = {
                email: user.email,
                id: studentExist.id,
                role: "student",
                uid: user.uid
            },
                next();
        };

        const teacherExist = await prisma.teacher.findFirst({
            where: {
                email: user.email
            },
        });

        if (teacherExist) {
            req.user = {
                email: user.email,
                id: teacherExist.id,
                role: "teacher",
                uid: user.uid
            },
                next();
        };

        const adminExist = await prisma.admin.findFirst({
            where: {
                email: user.email
            },
        });

        if (adminExist) {
            req.user = {
                email: user.email,
                id: adminExist.id,
                role: "admin",
                uid: user.uid
            },
                next();
        };

    } catch (error) {
        console.log("Authentication error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    };
};