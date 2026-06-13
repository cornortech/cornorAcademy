import { Router, Request, Response } from "express";
import prisma from "../libs/db";
import transporter from "../libs/node.mailer";
import { createVerificationToken, sendVerificationEmail, verifyToken, deleteVerificationToken } from "../libs/email.service";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { uid, name, email, phoneNumber, gender, image, dob, address, city, district, pincode, country, about, educationInstitute, qualification } = req.body;

    if (!uid || !name || !email || !phoneNumber || !gender) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const studentExists = await prisma.student.findFirst({ where: { OR: [{ uid }, { email }, { phoneNumber }] } });
    if (studentExists) {
      return res.status(400).json({ success: false, error: "Student with same uid, email or phone number already exists" });
    }

    const newStudent = await prisma.student.create({
      data: { uid, name, email, phoneNumber, gender: gender.toLowerCase(), image: image || "", dob: dob || "", address: address || "", city: city || "", district: district || "", pincode: pincode || "", country: country || "", about: about || "", educationInstitute: educationInstitute || "", qualification: qualification || "" },
    });

    let verificationToken = "";
    try {
      verificationToken = await createVerificationToken(email);
      const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
      await sendVerificationEmail(email, name, verificationLink);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
    }

    return res.status(201).json({ success: true, studentId: newStudent.id, verificationToken, message: "Account created." });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/register/teacher", async (req: Request, res: Response) => {
  try {
    const { uid, name, email, image, bio, noOfYearsExperience, expertise, dob, gender } = req.body;

    if (!uid || !name || !email || !bio || noOfYearsExperience === undefined || !expertise || !dob || !gender) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const existingUser = await prisma.teacher.findFirst({ where: { OR: [{ uid }, { email }] } });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Teacher with same uid or email already exists" });
    }

    const studentWithEmail = await prisma.student.findUnique({ where: { email } });
    if (studentWithEmail) {
      return res.status(400).json({ success: false, error: "Email already registered as a student" });
    }

    const newTeacher = await prisma.teacher.create({
      data: { uid, name, email, image: image || "", bio, noOfYearsExperience: parseInt(noOfYearsExperience), expertise, dob, gender: gender.toLowerCase() },
    });

    let verificationToken = "";
    try {
      verificationToken = await createVerificationToken(email);
      const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
      await sendVerificationEmail(email, name, verificationLink);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
    }

    return res.status(201).json({ success: true, teacherId: newTeacher.id, verificationToken, message: "Account created." });
  } catch (error) {
    console.error("Error creating teacher:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    let user: any = await prisma.student.findUnique({ where: { email } });
    let role: "student" | "teacher" | "admin" | null = user ? "student" : null;

    if (!user) {
      user = await prisma.teacher.findUnique({ where: { email } });
      if (user) role = "teacher";
    }

    if (!user) {
      user = await prisma.admin.findUnique({ where: { email } });
      if (user) role = "admin";
    }

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials", code: "auth/user-not-found" });
    }

    if (role === "student") {
      switch (user.status) {
        case "registered":
          break;
        case "portalActivated":
          break;
        case "portalDeactivated":
          return res.status(403).json({ success: false, error: "Student Platform access is deactivated" });
        case "rejected":
          return res.status(403).json({ success: false, error: "Student Registration rejected" });
        default:
          break;
      }
    }

    if (role !== "admin" && !user.isVerified) {
      return res.status(403).json({ success: false, error: "Please verify your email before logging in" });
    }

    const redirectUrl = role === "admin" ? "/admin" : role === "teacher" ? "/teacher" : "/student";
    return res.status(200).json({ uid: user.uid, id: user.id, name: user.name, email: user.email, role, status: user.status, redirectionUrl: redirectUrl });
  } catch (error) {
    console.error("Error Login:", error);
    return res.status(500).json({ success: false, error: "Login failed" });
  }
});

router.post("/verify-email", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, error: "Token is required" });
    }

    const email = await verifyToken(token);
    if (!email) {
      return res.status(400).json({ success: false, error: "Invalid or expired token" });
    }

    await prisma.student.updateMany({ where: { email }, data: { isVerified: true } });
    await prisma.teacher.updateMany({ where: { email }, data: { isVerified: true } });
    await deleteVerificationToken(token);

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/resend-verification", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    let user: any = await prisma.student.findUnique({ where: { email } });
    let name = user?.name;
    if (!user) {
      user = await prisma.teacher.findUnique({ where: { email } });
      name = user?.name;
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, error: "Email is already verified" });
    }

    const verificationToken = await createVerificationToken(email);
    const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, name || email, verificationLink);

    return res.status(200).json({ success: true, verificationToken, message: "Verification email sent" });
  } catch (error) {
    console.error("Error resending verification:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/test-email", async (_req: Request, res: Response) => {
  try {
    await transporter.verify();
    const info = await transporter.sendMail({
      from: `"Cornor Academy" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "SMTP Test",
      text: "If you receive this, SMTP is working.",
    });
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("SMTP test failed:", error);
    return res.status(500).json({ success: false, error: error.message || "SMTP test failed" });
  }
});

export default router;
