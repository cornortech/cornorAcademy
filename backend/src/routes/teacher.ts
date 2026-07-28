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

    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher || !teacher.isApproved) {
      return res.status(403).json({ success: false, error: "CONTACT ADMINISTRATION TO VERIFY YOUR ACCOUNT CORNOR ACADEMY" });
    }

    const { title, description, requirements, includes, whatYouWillLearn, language, level, thumbnail, category, startDate, duration, price, type, parts, meetingUrl } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return res.status(500).json({ success: false, error: "No admin configured" });
    }

    const isLive = type === "live";

    const course = await prisma.course.create({
      data: {
        title,
        description: description || "",
        requirements: requirements || [],
        includes: includes || [],
        whatYouWillLearn: whatYouWillLearn || [],
        meetingUrl: meetingUrl || "",
        meetingTime: startDate ? new Date(startDate) : new Date(),
        isOngoing: isLive,
        language: language || "english",
        level: level || "beginner",
        thumbnail: thumbnail || "",
        category: category || "WebDevelopment",
        startDate: startDate ? new Date(startDate) : new Date(),
        duration: isLive ? (duration || 1) : (parts?.reduce((sum: number, p: any) => sum + (p.duration || 0), 0) || 0),
        price: price || 0,
        teacherId,
        adminId: admin.id,
      },
    });

    if (!isLive && parts?.length > 0) {
      await prisma.lesson.createMany({
        data: parts.map((part: any, index: number) => ({
          courseId: course.id,
          title: part.title,
          videoUrl: part.videoUrl || "",
          order: index + 1,
          duration: part.duration || 0,
        })),
      });
    }

    res.status(201).json({ success: true, courseId: course.id });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.put("/teacher/course/:courseId", authenticate, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.id;
    if (req.user!.role !== "teacher") {
      return res.status(403).json({ success: false, error: "Only teachers can edit courses" });
    }

    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher || !teacher.isApproved) {
      return res.status(403).json({ success: false, error: "CONTACT ADMINISTRATION TO VERIFY YOUR ACCOUNT CORNOR ACADEMY" });
    }

    const { courseId } = req.params;
    const existing = await prisma.course.findUnique({ where: { id: courseId } });
    if (!existing) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }
    if (existing.teacherId !== teacherId) {
      return res.status(403).json({ success: false, error: "You can only edit your own courses" });
    }

    const { title, thumbnail, parts, price } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: "Title is required" });
    }

    const newDuration = parts?.reduce((sum: number, p: any) => sum + (p.duration || 0), 0) || 0;

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        title,
        thumbnail: thumbnail || "",
        price: price || 0,
        duration: newDuration,
      },
    });

    await prisma.lesson.deleteMany({ where: { courseId } });

    if (parts?.length > 0) {
      await prisma.lesson.createMany({
        data: parts.map((part: any, index: number) => ({
          courseId: course.id,
          title: part.title,
          videoUrl: part.videoUrl || "",
          order: index + 1,
          duration: part.duration || 0,
        })),
      });
    }

    res.status(200).json({ success: true, courseId: course.id });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
