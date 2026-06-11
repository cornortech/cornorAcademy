"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../libs/db"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/certificates/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await db_1.default.certificate.findUnique({
            where: { id },
            include: {
                student: { select: { name: true, email: true } },
                course: { select: { title: true } },
            },
        });
        if (!certificate) {
            return res.status(404).json({ success: false, error: "Certificate not found" });
        }
        if (req.user.role === "student" && req.user.id !== certificate.studentId) {
            return res.status(403).json({ success: false, error: "Access denied" });
        }
        res.json(certificate);
    }
    catch (error) {
        console.error("Error fetching certificate:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get("/certificates/verify/:certId", async (req, res) => {
    try {
        const { certId } = req.params;
        const certificate = await db_1.default.certificate.findUnique({
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
    }
    catch (error) {
        console.error("Error verifying certificate:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
exports.default = router;
