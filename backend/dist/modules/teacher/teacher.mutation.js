"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherMutationHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const createTeacher = async ({ req }) => {
    try {
        const { uid, name, email, image, bio, noOfYearsExperience, expertise, dob, gender } = req.body;
        const teacherExists = await db_1.default.teacher.findUnique({
            where: { email }
        });
        if (teacherExists) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Teacher profile with this email already exists",
                }
            };
        }
        await db_1.default.teacher.create({
            data: { uid, name, email, image, bio, noOfYearsExperience, expertise, dob, gender },
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "Teacher account created successfully",
            },
        };
    }
    catch (error) {
        console.error("Error creating teacher profile:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const updateTeacher = async ({ req }) => {
    try {
        const { teacherId } = req.params;
        const { name, email, image, bio, noOfYearsExperience, expertise, dob, gender, status } = req.body;
        const teacherExists = await db_1.default.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });
        if (!teacherExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Teacher profile not found",
                }
            };
        }
        const updatedTeacher = await db_1.default.teacher.update({
            where: {
                id: teacherId,
            },
            data: {
                name,
                email,
                image,
                bio,
                noOfYearsExperience,
                expertise,
                dob,
                gender,
                status,
            },
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Teacher Profile Updated Successfully",
            },
        };
    }
    catch (error) {
        console.error("Error updating teacher profile:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const deleteTeacher = async ({ req }) => {
    try {
        const { teacherId, } = req.params;
        const teacherExists = await db_1.default.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });
        if (!teacherExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Teacher profile not found",
                },
            };
        }
        await db_1.default.teacher.delete({
            where: {
                id: teacherId,
            },
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Teacher Profile Deleted Successfully",
            },
        };
    }
    catch (error) {
        console.error("Error deleting teacher profile:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.teacherMutationHandlers = {
    createTeacher,
    updateTeacher,
    deleteTeacher,
};
