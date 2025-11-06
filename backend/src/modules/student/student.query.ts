import { AppRouteQueryImplementation } from "@ts-rest/express";
import { studentContract } from "../../contract/student/student.contract";
import prisma from "../../libs/db";

const getAllStudents: AppRouteQueryImplementation<
    typeof studentContract.getAllStudents
> = async ({ req }) => {
    try {

        const allStudent = await prisma.student.findMany();

        return {
            status: 200,
            body: allStudent.map(student => ({
                id: student.id,
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

    } catch (error) {
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

const getStudentById: AppRouteQueryImplementation<
    typeof studentContract.getStudentById
> = async ({ req }) => {
    try {

        const { studentId } = req.params;

        const studentById = await prisma.student.findUnique({
            where: 
            { 
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

    } catch (error) {
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

const deleteStudent: AppRouteQueryImplementation<
    typeof studentContract.deleteStudent
> = async ({ req }) => {
    try {

        const { id } = req.params;

        const studentExists = await prisma.student.findUnique({
            where: { id },
        });

        if (!studentExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Student not found",
                },
            };
        }

        const deletedStudentById = await prisma.student.delete({
            where: { id },
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Student Profile Deleted Successfully",
            },
        };

    } catch (error) {
        console.error("Error deleting student:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

export const studentQueryHandlers = {
    getAllStudents,
    getStudentById,
    deleteStudent,
}