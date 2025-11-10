import { AppRouteQueryImplementation } from "@ts-rest/express";
import { teacherContract } from "../../contract/teacher/teacher.contract";
import prisma from "../../libs/db";

const getAllTeachers: AppRouteQueryImplementation<
    typeof teacherContract.getAllTeachers
> = async ({ req }) => {
    try {

        const allTeachers = await prisma.teacher.findMany();

        return {
            status: 200,
            body: allTeachers.map(teacher => ({
                id: teacher.id,
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

    } catch (error) {
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

const getTeacherById: AppRouteQueryImplementation<
    typeof teacherContract.getTeacherById
> = async ({ req }) => {
    try {

        const { id } = req.params;

        const teacherById = await prisma.teacher.findUnique({
            where: {
                id,
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
    } catch (error) {
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

const deleteTeacher:AppRouteQueryImplementation<
typeof teacherContract.deleteTeacher
> = async ({ req }) => {
    try {

        const { id } = req.params;

        const teacherExists = await prisma.teacher.findUnique({
            where: {
                id,
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

        await prisma.teacher.delete({
            where: {
                id,
            },
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Teacher Profile Deleted Successfully",
            },
        };
    } catch (error) {
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

export const teacherQueryHandlers = {
    getAllTeachers,
    getTeacherById,
    deleteTeacher,
}