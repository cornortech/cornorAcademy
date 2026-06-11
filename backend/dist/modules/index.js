"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("@ts-rest/express");
const contract_1 = require("../contract");
const student_router_1 = require("./student/student.router");
const teacher_router_1 = require("./teacher/teacher.router");
const course_router_1 = require("./course/course.router");
const enrollement_router_1 = require("./enrollement/enrollement.router");
const media_router_1 = require("./media/media.router");
const announcement_router_1 = require("./announcement/announcement.router");
const auth_router_1 = require("./auth/auth.router");
const s = (0, express_1.initServer)();
exports.router = s.router(contract_1.contract, {
    student: student_router_1.studentRouter,
    teacher: teacher_router_1.teacherRouter,
    course: course_router_1.courseRouter,
    enrollement: enrollement_router_1.enrollementRequestRouter,
    courseMedia: media_router_1.courseMediaRouter,
    announcement: announcement_router_1.announcementRouter,
    auth: auth_router_1.authRouter,
});
