import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/progress/complete", authenticate, async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.body;
    const studentId = req.user!.id;

    if (!lessonId) {
      return res.status(400).json({ success: false, error: "Lesson ID required" });
    }

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) {
      return res.status(404).json({ success: false, error: "Lesson not found" });
    }

    const enrollment = await prisma.enrolledCourses.findFirst({
      where: { studentId, courseId: lesson.courseId, status: "approved" },
    });

    if (!enrollment) {
      return res.status(403).json({ success: false, error: "Not enrolled in this course" });
    }

    const existing = await prisma.progress.findFirst({
      where: { lessonId, enrollmentId: enrollment.id },
    });

    if (existing) {
      return res.json({ success: true, message: "Already completed" });
    }

    await prisma.progress.create({
      data: { lessonId, enrollmentId: enrollment.id, completed: true, completedAt: new Date() },
    });

    const totalLessons = await prisma.lesson.count({ where: { courseId: lesson.courseId } });
    const completedLessons = await prisma.progress.count({
      where: { enrollmentId: enrollment.id, completed: true },
    });

    if (completedLessons >= totalLessons && totalLessons > 0) {
      const student = await prisma.student.findUnique({ where: { id: studentId } });
      const course = await prisma.course.findUnique({ where: { id: lesson.courseId } });
      if (student && course) {
        const certCount = await prisma.certificate.count({
          where: { studentId, courseId: lesson.courseId },
        });

        if (certCount === 0) {
          const certId = `CRNA-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
          const certUrl = `${process.env.BASE_URL || "http://localhost:4000"}/api/certificates/${certId}`;

          await prisma.certificate.create({
            data: { studentId, courseId: lesson.courseId, url: certUrl, certId },
          });

          const { sendVerificationEmail } = await import("../libs/email.service");
          try {
            await sendVerificationEmail(
              student.email,
              student.name,
              `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-certificate?id=${certId}`
            );
          } catch (e) {
            console.error("Failed to send certificate email:", e);
          }
        }
      }
    }

    res.json({ success: true, message: "Progress updated" });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/progress/:courseId", authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user!.id;

    const enrollment = await prisma.enrolledCourses.findFirst({
      where: { studentId, courseId, status: "approved" },
    });

    if (!enrollment) {
      return res.status(403).json({ success: false, error: "Not enrolled" });
    }

    const totalLessons = await prisma.lesson.count({ where: { courseId } });
    const completedLessons = await prisma.progress.count({
      where: { enrollmentId: enrollment.id, completed: true },
    });

    const progress = await prisma.progress.findMany({
      where: { enrollmentId: enrollment.id },
      include: { lesson: { select: { id: true, title: true, order: true } } },
    });

    res.json({
      totalLessons,
      completedLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      progress,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
