"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../libs/db"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/teacher/course", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const teacherId = req.user.id;
        if (req.user.role !== "teacher") {
            return res.status(403).json({ success: false, error: "Only teachers can create courses" });
        }
        const { title, description, requirements, includes, whatYouWillLearn, language, level, thumbnail, category, startDate, duration, price, curriculum } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }
        const admin = await db_1.default.admin.findFirst();
        if (!admin) {
            return res.status(500).json({ success: false, error: "No admin configured" });
        }
        const course = await db_1.default.course.create({
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
                    create: curriculum.map((c) => ({
                        title: c.title,
                        noOfLesson: c.noOfLesson || 1,
                        duration: c.duration || 1,
                        content: c.content || [],
                    })),
                } : undefined,
            },
        });
        res.status(201).json({ success: true, courseId: course.id });
    }
    catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
exports.default = router;
