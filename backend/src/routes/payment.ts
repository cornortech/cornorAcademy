import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/initiate", authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user!.id;

    if (!courseId) {
      return res.status(400).json({ success: false, error: "Course ID required" });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    const existing = await prisma.enrolledCourses.findFirst({
      where: { studentId, courseId },
    });
    if (existing) {
      return res.status(400).json({ success: false, error: "Already enrolled or requested" });
    }

    const payment = await prisma.payment.create({
      data: { studentId, courseId, amount: course.price, provider: "khalti", status: "PENDING" },
    });

    const checkoutUrl = `${process.env.BASE_URL || "http://localhost:4000"}/payment/mock-checkout/${payment.id}`;

    res.status(201).json({ success: true, paymentId: payment.id, checkoutUrl });
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/mock-checkout/:paymentId", async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { course: true, student: true },
    });

    if (!payment) {
      return res.status(404).send("Payment not found");
    }

    const settings = await prisma.systemSettings.findFirst();
    const currency = settings?.currency || "npr";
    let currencySymbol = "Rs. ";
    if (currency === "usd") currencySymbol = "$";
    else if (currency === "eur") currencySymbol = "€";
    else if (currency === "gbp") currencySymbol = "£";
    else if (currency === "inr") currencySymbol = "₹";

    res.send(`
      <!DOCTYPE html>
      <html><head><title>Mock Payment</title>
      <style>
        body { font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f9fafb; margin: 0; }
        .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 400px; width: 100%; text-align: center; }
        h2 { color: #1f2937; margin-bottom: 0.5rem; }
        .amount { font-size: 2rem; font-weight: bold; color: #7c3aed; margin: 1rem 0; }
        .btn { background: #7c3aed; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 1rem; cursor: pointer; margin-top: 1rem; width: 100%; }
        .btn:hover { background: #6d28d9; }
        .info { color: #6b7280; font-size: 0.875rem; margin: 0.5rem 0; }
      </style>
      </head><body>
        <div class="card">
          <h2>Mock Payment</h2>
          <p class="info">Course: ${payment.course.title}</p>
          <p class="info">Student: ${payment.student.name}</p>
          <div class="amount">${currencySymbol}${payment.amount}</div>
          <p class="info">Provider: ${payment.provider}</p>
          <form method="POST" action="/payment/verify">
            <input type="hidden" name="paymentId" value="${payment.id}" />
            <button type="submit" class="btn">Complete Payment</button>
          </form>
        </div>
      </body></html>
    `);
  } catch (error) {
    console.error("Error showing checkout:", error);
    res.status(500).send("Internal server error");
  }
});

router.post("/verify", async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;

    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!payment) {
      return res.status(404).json({ success: false, error: "Payment not found" });
    }

    await prisma.payment.update({ where: { id: payment.id }, data: { status: "COMPLETED" } });

    await prisma.enrolledCourses.create({
      data: { studentId: payment.studentId, courseId: payment.courseId, paymentURL: "", status: "approved" },
    });

    if (payment.status !== "COMPLETED") {
      const { sendVerificationEmail } = await import("../libs/email.service");
      const student = await prisma.student.findUnique({ where: { id: payment.studentId } });
      const course = await prisma.course.findUnique({ where: { id: payment.courseId } });
      if (student && course) {
        try {
          await sendVerificationEmail(
            student.email,
            student.name,
            `${process.env.FRONTEND_URL || "http://localhost:3000"}/student/course/${course.id}`
          );
        } catch (e) {
          console.error("Failed to send enrollment email:", e);
        }
      }
    }

    res.json({ success: true, message: "Payment successful! You are now enrolled." });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
