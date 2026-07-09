import { initContract } from "@ts-rest/core";
import { studentContract } from "./student/student.contract";
import { teacherContract } from "./teacher/teacher.contract";
import { courseContract } from "./course/course.contract";
import { enrollementRequestContract } from "./enrollement/enrollement.contract";
import { courseMediaContract } from "./media/media.contract";
import { courseAnnouncementContract } from "./announcement/courseAnnouncement.contract";
import { platformAnnouncementContract } from "./announcement/platformAnnouncement.contract";
import { authContract } from "./auth/auth.contract";

const c = initContract();

export const contract = c.router({
    student: studentContract,
    teacher: teacherContract,
    course: courseContract,
    enrollement: enrollementRequestContract,
    courseMedia: courseMediaContract,
    courseAnnouncement: courseAnnouncementContract,
    platformAnnouncement: platformAnnouncementContract,
    auth: authContract,
});