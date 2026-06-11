"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../libs/db"));
const node_mailer_1 = __importDefault(require("../libs/node.mailer"));
const email_service_1 = require("../libs/email.service");
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    try {
        const { uid, name, email, phoneNumber, gender, image, dob, address, city, district, pincode, country, about, educationInstitute, qualification } = req.body;
        if (!uid || !name || !email || !phoneNumber || !gender) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }
        const studentExists = await db_1.default.student.findFirst({ where: { OR: [{ uid }, { email }, { phoneNumber }] } });
        if (studentExists) {
            return res.status(400).json({ success: false, error: "Student with same uid, email or phone number already exists" });
        }
        const newStudent = await db_1.default.student.create({
            data: { uid, name, email, phoneNumber, gender: gender.toLowerCase(), image: image || "", dob: dob || "", address: address || "", city: city || "", district: district || "", pincode: pincode || "", country: country || "", about: about || "", educationInstitute: educationInstitute || "", qualification: qualification || "" },
        });
        let verificationToken = "";
        try {
            verificationToken = await (0, email_service_1.createVerificationToken)(email);
            const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
            await (0, email_service_1.sendVerificationEmail)(email, name, verificationLink);
        }
        catch (emailError) {
            console.error("Failed to send verification email:", emailError);
        }
        return res.status(201).json({ success: true, studentId: newStudent.id, verificationToken, message: "Account created." });
    }
    catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email } = req.body;
        let user = await db_1.default.student.findUnique({ where: { email } });
        let role = user ? "student" : null;
        if (!user) {
            user = await db_1.default.teacher.findUnique({ where: { email } });
            if (user)
                role = "teacher";
        }
        if (!user) {
            user = await db_1.default.admin.findUnique({ where: { email } });
            if (user)
                role = "admin";
        }
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
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
    }
    catch (error) {
        console.error("Error Login:", error);
        return res.status(500).json({ success: false, error: "Login failed" });
    }
});
router.post("/verify-email", async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ success: false, error: "Token is required" });
        }
        const email = await (0, email_service_1.verifyToken)(token);
        if (!email) {
            return res.status(400).json({ success: false, error: "Invalid or expired token" });
        }
        await db_1.default.student.updateMany({ where: { email }, data: { isVerified: true } });
        await db_1.default.teacher.updateMany({ where: { email }, data: { isVerified: true } });
        await (0, email_service_1.deleteVerificationToken)(token);
        return res.status(200).json({ success: true, message: "Email verified successfully" });
    }
    catch (error) {
        console.error("Error verifying email:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.post("/resend-verification", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, error: "Email is required" });
        }
        let user = await db_1.default.student.findUnique({ where: { email } });
        let name = user?.name;
        if (!user) {
            user = await db_1.default.teacher.findUnique({ where: { email } });
            name = user?.name;
        }
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ success: false, error: "Email is already verified" });
        }
        const verificationToken = await (0, email_service_1.createVerificationToken)(email);
        const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
        await (0, email_service_1.sendVerificationEmail)(email, name || email, verificationLink);
        return res.status(200).json({ success: true, verificationToken, message: "Verification email sent" });
    }
    catch (error) {
        console.error("Error resending verification:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.post("/test-email", async (_req, res) => {
    try {
        await node_mailer_1.default.verify();
        const info = await node_mailer_1.default.sendMail({
            from: `"Cornor Academy" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: "SMTP Test",
            text: "If you receive this, SMTP is working.",
        });
        return res.status(200).json({ success: true, messageId: info.messageId });
    }
    catch (error) {
        console.error("SMTP test failed:", error);
        return res.status(500).json({ success: false, error: error.message || "SMTP test failed" });
    }
});
exports.default = router;
