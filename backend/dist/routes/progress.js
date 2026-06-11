"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../libs/db"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/progress/complete", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { lessonId } = req.body;
        const studentId = req.user.id;
        if (!lessonId) {
            return res.status(400).json({ success: false, error: "Lesson ID required" });
        }
        const lesson = await db_1.default.lesson.findUnique({ where: { id: lessonId } });
        if (!lesson) {
            return res.status(404).json({ success: false, error: "Lesson not found" });
        }
        const enrollment = await db_1.default.enrolledCourses.findFirst({
            where: { studentId, courseId: lesson.courseId, status: "approved" },
        });
        if (!enrollment) {
            return res.status(403).json({ success: false, error: "Not enrolled in this course" });
        }
        const existing = await db_1.default.progress.findFirst({
            where: { lessonId, enrollmentId: enrollment.id },
        });
        if (existing) {
            return res.json({ success: true, message: "Already completed" });
        }
        await db_1.default.progress.create({
            data: { lessonId, enrollmentId: enrollment.id, completed: true, completedAt: new Date() },
        });
        const totalLessons = await db_1.default.lesson.count({ where: { courseId: lesson.courseId } });
        const completedLessons = await db_1.default.progress.count({
            where: { enrollmentId: enrollment.id, completed: true },
        });
        if (completedLessons >= totalLessons && totalLessons > 0) {
            const student = await db_1.default.student.findUnique({ where: { id: studentId } });
            const course = await db_1.default.course.findUnique({ where: { id: lesson.courseId } });
            if (student && course) {
                const certCount = await db_1.default.certificate.count({
                    where: { studentId, courseId: lesson.courseId },
                });
                if (certCount === 0) {
                    const certId = `CRNA-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
                    const certUrl = `${process.env.BASE_URL || "http://localhost:4000"}/api/certificates/${certId}`;
                    await db_1.default.certificate.create({
                        data: { studentId, courseId: lesson.courseId, url: certUrl, certId },
                    });
                    const { sendVerificationEmail } = await Promise.resolve().then(() => __importStar(require("../libs/email.service")));
                    try {
                        await sendVerificationEmail(student.email, student.name, `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-certificate?id=${certId}`);
                    }
                    catch (e) {
                        console.error("Failed to send certificate email:", e);
                    }
                }
            }
        }
        res.json({ success: true, message: "Progress updated" });
    }
    catch (error) {
        console.error("Error updating progress:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get("/progress/:courseId", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id;
        const enrollment = await db_1.default.enrolledCourses.findFirst({
            where: { studentId, courseId, status: "approved" },
        });
        if (!enrollment) {
            return res.status(403).json({ success: false, error: "Not enrolled" });
        }
        const totalLessons = await db_1.default.lesson.count({ where: { courseId } });
        const completedLessons = await db_1.default.progress.count({
            where: { enrollmentId: enrollment.id, completed: true },
        });
        const progress = await db_1.default.progress.findMany({
            where: { enrollmentId: enrollment.id },
            include: { lesson: { select: { id: true, title: true, order: true } } },
        });
        res.json({
            totalLessons,
            completedLessons,
            percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
            progress,
        });
    }
    catch (error) {
        console.error("Error fetching progress:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
exports.default = router;
