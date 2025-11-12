import { initContract } from "@ts-rest/core";
import { studentContract } from "./student/student.contract";
import { teacherContract } from "./teacher/teacher.contract";
import { courseContract } from "./course/course.contract";
import { enrollementRequestContract } from "./enrollement/enrollement.contract";
import { courseMediaContract } from "./media/media.contract";
import { announcementContract } from "./announcement/announcement.contract";
import { authContract } from "./auth/auth.contract";

const c = initContract();

export const contract = c.router({
    student: studentContract,
    teacher: teacherContract,
    course: courseContract,
    enrollement: enrollementRequestContract,
    courseMedia: courseMediaContract,
    announcement: announcementContract,
    auth: authContract,
});