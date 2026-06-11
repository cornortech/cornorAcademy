import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/lessons/:courseId", authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const lessons = await prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: "asc" },
    });
    res.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/lesson/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, title: true } },
      },
    });

    if (!lesson) {
      return res.status(404).json({ success: false, error: "Lesson not found" });
    }

    const enrollment = await prisma.enrolledCourses.findFirst({
      where: {
        studentId: req.user!.id,
        courseId: lesson.courseId,
        status: "approved",
      },
    });

    if (!enrollment && req.user!.role === "student") {
      return res.status(403).json({ success: false, error: "Not enrolled in this course" });
    }

    res.json(lesson);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
