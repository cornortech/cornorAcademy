"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../libs/db"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/lessons/:courseId", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { courseId } = req.params;
        const lessons = await db_1.default.lesson.findMany({
            where: { courseId },
            orderBy: { order: "asc" },
        });
        res.json(lessons);
    }
    catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
router.get("/lesson/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await db_1.default.lesson.findUnique({
            where: { id },
            include: {
                course: { select: { id: true, title: true } },
            },
        });
        if (!lesson) {
            return res.status(404).json({ success: false, error: "Lesson not found" });
        }
        const enrollment = await db_1.default.enrolledCourses.findFirst({
            where: {
                studentId: req.user.id,
                courseId: lesson.courseId,
                status: "approved",
            },
        });
        if (!enrollment && req.user.role === "student") {
            return res.status(403).json({ success: false, error: "Not enrolled in this course" });
        }
        res.json(lesson);
    }
    catch (error) {
        console.error("Error fetching lesson:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
exports.default = router;
