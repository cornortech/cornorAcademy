"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = void 0;
const core_1 = require("@ts-rest/core");
const student_contract_1 = require("./student/student.contract");
const teacher_contract_1 = require("./teacher/teacher.contract");
const course_contract_1 = require("./course/course.contract");
const enrollement_contract_1 = require("./enrollement/enrollement.contract");
const media_contract_1 = require("./media/media.contract");
const announcement_contract_1 = require("./announcement/announcement.contract");
const auth_contract_1 = require("./auth/auth.contract");
const c = (0, core_1.initContract)();
exports.contract = c.router({
    student: student_contract_1.studentContract,
    teacher: teacher_contract_1.teacherContract,
    course: course_contract_1.courseContract,
    enrollement: enrollement_contract_1.enrollementRequestContract,
    courseMedia: media_contract_1.courseMediaContract,
    announcement: announcement_contract_1.announcementContract,
    auth: auth_contract_1.authContract,
});
