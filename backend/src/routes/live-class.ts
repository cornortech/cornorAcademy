import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import { authenticate } from "../middleware/auth.middleware";
import { sendLiveClassReminderEmail } from "../libs/email.service";

const router = Router();

router.post("/live-class/:courseId/send-reminder", authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user!.id;

    const enrollment = await prisma.enrolledCourses.findFirst({
      where: { studentId, courseId, status: "approved" },
      include: {
        course: { select: { title: true, meetingUrl: true, meetingTime: true, reminderSent: true } },
        student: { select: { name: true, email: true } },
      },
    });

    if (!enrollment) {
      return res.status(403).json({ success: false, error: "Not enrolled in this course" });
    }

    const { course, student } = enrollment;
    if (course.reminderSent) {
      return res.json({ success: true, message: "Reminder already sent" });
    }

    await sendLiveClassReminderEmail(
      student.email,
      student.name,
      course.title,
      course.meetingUrl,
      course.meetingTime
    );

    await prisma.course.update({
      where: { id: courseId },
      data: { reminderSent: true },
    });

    res.json({ success: true, message: "Reminder sent" });
  } catch (error) {
    console.error("Error sending live class reminder:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
