import { initServer } from "@ts-rest/express";
import { contract } from "../contract";
import { studentRouter } from "./student/student.router";
import { teacherRouter } from "./teacher/teacher.router";
import { courseRouter } from "./course/course.router";
import { enrolledCourseRouter } from "./enrollement/enrolled.router";
import { courseMediaRouter } from "./media/media.router";
import { announcementRouter } from "./announcement/announcement.router";

const s = initServer();

export const router = s.router(contract, {
    student: studentRouter,
    teacher: teacherRouter,
    course: courseRouter,
    enrolledCourse: enrolledCourseRouter,
    courseMedia: courseMediaRouter,
    announcement: announcementRouter,
});