import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/certificates/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const certificate = await prisma.certificate.findUnique({
      where: { id },
      include: {
        student: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    });

    if (!certificate) {
      return res.status(404).json({ success: false, error: "Certificate not found" });
    }

    if (req.user!.role === "student" && req.user!.id !== certificate.studentId) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    res.json(certificate);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/certificates/verify/:certId", async (req: Request, res: Response) => {
  try {
    const { certId } = req.params;
    const certificate = await prisma.certificate.findUnique({
      where: { certId },
      include: {
        student: { select: { name: true } },
        course: { select: { title: true } },
      },
    });

    if (!certificate) {
      return res.status(404).json({ success: false, error: "Invalid certificate ID" });
    }

    res.json({
      valid: true,
      studentName: certificate.student.name,
      courseTitle: certificate.course.title,
      issuedAt: certificate.issuedAt,
      certId: certificate.certId,
    });
  } catch (error) {
    console.error("Error verifying certificate:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
