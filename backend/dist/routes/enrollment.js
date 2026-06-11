"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../libs/db"));
const router = (0, express_1.Router)();
router.get("/enrolled/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const enrollments = await db_1.default.enrolledCourses.findMany({
            where: { studentId },
            include: {
                course: {
                    include: { teacher: true },
                },
                student: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        return res.status(200).json(enrollments);
    }
    catch (error) {
        console.error("Error fetching student enrollments:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});
exports.default = router;
