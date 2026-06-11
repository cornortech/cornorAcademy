import { Router, Request, Response } from "express";
import prisma from "../libs/db";

const router = Router();

router.get("/enrolled/:studentId", async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const enrollments = await prisma.enrolledCourses.findMany({
      where: { studentId },
      include: {
        course: {
          include: { teacher: true },
        },
        student: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    return res.status(200).json(enrollments);
  } catch (error) {
    console.error("Error fetching student enrollments:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
