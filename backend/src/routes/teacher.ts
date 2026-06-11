import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/teacher/course", authenticate, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.id;
    if (req.user!.role !== "teacher") {
      return res.status(403).json({ success: false, error: "Only teachers can create courses" });
    }

    const { title, description, requirements, includes, whatYouWillLearn, language, level, thumbnail, category, startDate, duration, price, curriculum } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return res.status(500).json({ success: false, error: "No admin configured" });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        requirements: requirements || [],
        includes: includes || [],
        whatYouWillLearn: whatYouWillLearn || [],
        meetingUrl: "",
        meetingTime: new Date(),
        language: language || "english",
        level: level || "beginner",
        thumbnail: thumbnail || "",
        category: category || "WebDevelopment",
        startDate: startDate ? new Date(startDate) : new Date(),
        duration: duration || 1,
        price: price || 0,
        teacherId,
        adminId: admin.id,
        courseCurriculum: curriculum ? {
          create: curriculum.map((c: any) => ({
            title: c.title,
            noOfLesson: c.noOfLesson || 1,
            duration: c.duration || 1,
            content: c.content || [],
          })),
        } : undefined,
      },
    });

    res.status(201).json({ success: true, courseId: course.id });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
