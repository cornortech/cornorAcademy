import { initServer } from "@ts-rest/express";
import { teacherContract } from "../../contract/teacher/teacher.contract";
import { teacherMutationHandlers } from "./teacher.mutation";
import { teacherQueryHandlers } from "./teacher.query";

const s = initServer();

export const teacherRouter = s.router(teacherContract, {
    createTeacher: teacherMutationHandlers.createTeacher,

    getAllTeachers: teacherQueryHandlers.getAllTeachers,

    getTeacherById: teacherQueryHandlers.getTeacherById,

    updateTeacher: teacherMutationHandlers.updateTeacher,

    deleteTeacher: teacherQueryHandlers.deleteTeacher,
});