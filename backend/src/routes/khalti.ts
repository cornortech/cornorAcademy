import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

const KHALTI_API_BASE = process.env.KHALTI_BASE_URL || "https://dev.khalti.com/api/v2";
const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY || "";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

router.post("/khalti/initiate", authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, error: "Course ID is required" });
    }

    if (req.user?.role !== "student") {
      return res.status(403).json({ success: false, error: "Only students can enroll" });
    }

    const student = await prisma.student.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true },
    });
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true },
    });
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    const existingEnrollment = await prisma.enrolledCourses.findFirst({
      where: { studentId: student.id, courseId: course.id },
    });
    if (existingEnrollment) {
      return res.status(400).json({ success: false, error: "Already enrolled or pending enrollment" });
    }

    const purchaseOrderId = `${course.id}:${student.id}:${Date.now()}`;
    const amountInPaisa = Math.round(course.price * 100);

    const khaltiRes = await fetch(`${KHALTI_API_BASE}/epayment/initiate/`, {
      method: "POST",
      headers: {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: `${req.protocol}://${req.get("host")}/payment/khalti/callback?courseId=${course.id}&studentId=${student.id}`,
        website_url: FRONTEND_URL,
        amount: amountInPaisa,
        purchase_order_id: purchaseOrderId,
        purchase_order_name: course.title,
        customer_info: {
          name: student.name,
          email: student.email,
        },
      }),
    });

    const khaltiData = await khaltiRes.json();

    if (!khaltiRes.ok) {
      console.error("Khalti initiate error:", khaltiData);
      return res.status(502).json({
        success: false,
        error: khaltiData?.detail || "Failed to initiate payment with Khalti",
      });
    }

    return res.status(200).json({
      success: true,
      payment_url: khaltiData.payment_url,
      pidx: khaltiData.pidx,
    });
  } catch (error) {
    console.error("Khalti initiate error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/khalti/callback", async (req: Request, res: Response) => {
  try {
    const { pidx, status: khaltiStatus } = req.query;

    if (!pidx || typeof pidx !== "string") {
      return res.redirect(`${FRONTEND_URL}/courses?payment=error&message=Invalid callback`);
    }

    if (khaltiStatus === "User cancelled") {
      return res.redirect(`${FRONTEND_URL}/courses?payment=cancelled`);
    }

    const lookupRes = await fetch(`${KHALTI_API_BASE}/epayment/lookup/`, {
      method: "POST",
      headers: {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    const lookupData = await lookupRes.json();

    if (!lookupRes.ok || lookupData.status !== "Completed") {
      console.error("Khalti lookup failed:", lookupData);
      return res.redirect(`${FRONTEND_URL}/courses?payment=failed`);
    }

    let { courseId, studentId } = req.query as { courseId?: string; studentId?: string };

    if (!courseId || !studentId) {
      const purchaseOrderId: string = lookupData.purchase_order_id || "";
      const parts = purchaseOrderId.split(":");
      if (parts.length < 2) {
        console.error("Khalti callback: missing courseId/studentId in query and purchase_order_id malformed:", purchaseOrderId);
        return res.redirect(`${FRONTEND_URL}/courses?payment=error&message=Invalid callback data`);
      }
      courseId = parts[0];
      studentId = parts[1];
    }

    const existingEnrollment = await prisma.enrolledCourses.findFirst({
      where: { studentId, courseId },
    });

    if (!existingEnrollment) {
      await prisma.enrolledCourses.create({
        data: {
          studentId,
          courseId,
          paymentURL: pidx,
          status: "requested",
        },
      });
    }

    return res.redirect(`${FRONTEND_URL}/courses/${courseId}?enrolled=success`);
  } catch (error) {
    console.error("Khalti callback error:", error);
    return res.redirect(`${FRONTEND_URL}/courses?payment=error`);
  }
});

export default router;
