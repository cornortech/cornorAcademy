import { initServer } from "@ts-rest/express";
import { studentContract } from "../../contract/student/student.contract";
import { studentMutationHandlers } from "./student.mutation";
import { studentQueryHandlers } from "./student.query";

const s = initServer();

export const studentRouter = s.router(studentContract, {
    createStudent: studentMutationHandlers.createStudent,

    updateStudent: studentMutationHandlers.updateStudent,

    getAllStudents: studentQueryHandlers.getAllStudents,

    getStudentById: studentQueryHandlers.getStudentById,
    
    deleteStudent: studentMutationHandlers.deleteStudent
});