import { initServer } from "@ts-rest/express";
import { contract } from "../contract";
import { studentRouter } from "./student/student.router";
import { teacherRouter } from "./teacher/teacher.router";
import { courseRouter } from "./course/course.router";
import { enrollementRequestRouter } from "./enrollement/enrollement.router";
import { courseMediaRouter } from "./media/media.router";
import { announcementRouter } from "./announcement/announcement.router";
import { authRouter } from "./auth/auth.router";

const s = initServer();

export const router = s.router(contract, {
    student: studentRouter,
    teacher: teacherRouter,
    course: courseRouter,
    enrollement: enrollementRequestRouter,
    courseMedia: courseMediaRouter,
    announcement: announcementRouter,
    auth: authRouter,
});