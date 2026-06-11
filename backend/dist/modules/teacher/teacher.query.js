"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherQueryHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const getAllTeachers = async ({ req }) => {
    try {
        const allTeachers = await db_1.default.teacher.findMany();
        return {
            status: 200,
            body: allTeachers.map(teacher => ({
                id: teacher.id,
                uid: teacher.uid,
                name: teacher.name,
                email: teacher.email,
                image: teacher.image,
                bio: teacher.bio,
                noOfYearsExperience: teacher.noOfYearsExperience,
                expertise: teacher.expertise,
                dob: teacher.dob,
                gender: teacher.gender,
                status: teacher.status,
                createdAt: teacher.createdAt,
                updatedAt: teacher.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Error fetching teachers:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const getTeacherById = async ({ req }) => {
    try {
        const { teacherId } = req.params;
        const teacherById = await db_1.default.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });
        if (!teacherById) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Teacher Not Found",
                },
            };
        }
        return {
            status: 200,
            body: {
                id: teacherById.id,
                uid: teacherById.uid,
                name: teacherById.name,
                email: teacherById.email,
                image: teacherById.image,
                bio: teacherById.bio,
                noOfYearsExperience: teacherById.noOfYearsExperience,
                expertise: teacherById.expertise,
                dob: teacherById.dob,
                gender: teacherById.gender,
                status: teacherById.status,
                createdAt: teacherById.createdAt,
                updatedAt: teacherById.updatedAt,
            },
        };
    }
    catch (error) {
        console.error("Error fetching teacher:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.teacherQueryHandlers = {
    getAllTeachers,
    getTeacherById,
};
