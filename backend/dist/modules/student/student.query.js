"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentQueryHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const getAllStudents = async ({ req }) => {
    try {
        const allStudent = await db_1.default.student.findMany();
        return {
            status: 200,
            body: allStudent.map(student => ({
                id: student.id,
                uid: student.uid,
                name: student.name,
                email: student.email,
                phoneNumber: student.phoneNumber,
                gender: student.gender,
                image: student.image,
                dob: student.dob,
                address: student.address,
                city: student.city,
                district: student.district,
                pincode: student.pincode,
                country: student.country,
                about: student.about,
                educationInstitute: student.educationInstitute,
                qualification: student.qualification,
                status: student.status,
                createdAt: student.createdAt,
                updatedAt: student.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Error fetching students:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const getStudentById = async ({ req }) => {
    try {
        const { studentId } = req.params;
        const studentById = await db_1.default.student.findUnique({
            where: {
                id: studentId,
            },
        });
        if (!studentById) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Required Student Not Found",
                },
            };
        }
        return {
            status: 200,
            body: {
                id: studentById.id,
                uid: studentById.uid,
                name: studentById.name,
                email: studentById.email,
                phoneNumber: studentById.phoneNumber,
                gender: studentById.gender,
                image: studentById.image,
                dob: studentById.dob,
                address: studentById.address,
                city: studentById.city,
                district: studentById.district,
                pincode: studentById.pincode,
                country: studentById.country,
                about: studentById.about,
                educationInstitute: studentById.educationInstitute,
                qualification: studentById.qualification,
                status: studentById.status,
                createdAt: studentById.createdAt,
                updatedAt: studentById.updatedAt,
            },
        };
    }
    catch (error) {
        console.error("Error fetching student:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.studentQueryHandlers = {
    getAllStudents,
    getStudentById,
};
