import { AppRouteMutationImplementation } from "@ts-rest/express";
import { teacherContract } from "../../contract/teacher/teacher.contract";
import prisma from "../../libs/db";

const createTeacher: AppRouteMutationImplementation<
    typeof teacherContract.createTeacher
> = async ({ req }) => {
    try {

        const { uid, name, email, image, bio, noOfYearsExperience, expertise, dob, gender } = req.body;

        const teacherExists = await prisma.teacher.findUnique({
            where: { email }
        });

        if (teacherExists) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Teacher profile with this email already exists",
                }
            }
        }

        await prisma.teacher.create({
            data: { uid, name, email, image, bio, noOfYearsExperience, expertise, dob, gender },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Teacher account created successfully",
            },
        };

    } catch (error) {
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

const updateTeacher: AppRouteMutationImplementation<
    typeof teacherContract.updateTeacher
> = async ({ req }) => {
    try {
        const { teacherId } = req.params;

        const { name, email, image, bio, noOfYearsExperience, expertise, dob, gender, status } = req.body;

        const teacherExists = await prisma.teacher.findUnique({
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

        const updatedTeacher = await prisma.teacher.update({
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

    } catch (error) {
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

const deleteTeacher:AppRouteMutationImplementation<
typeof teacherContract.deleteTeacher
> = async ({ req }) => {
    try {

        const { 
            teacherId,
         } = req.params;

        const teacherExists = await prisma.teacher.findUnique({
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

        await prisma.teacher.delete({
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

export const teacherMutationHandlers = {
    createTeacher,
    updateTeacher,
    deleteTeacher,
}