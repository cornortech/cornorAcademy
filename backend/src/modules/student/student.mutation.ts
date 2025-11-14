import { AppRouteMutationImplementation } from "@ts-rest/express";
import { studentContract } from "../../contract/student/student.contract";
import prisma from "../../libs/db";
import EmailService from "../../services/email.service";
import crypto from "crypto";

const createStudent: AppRouteMutationImplementation<
    typeof studentContract.createStudent
> = async ({ req }) => {
    try {

        const {
            uid,
            name,
            email,
            phoneNumber,
            gender,
            image,
            about,
            address,
            city,
            country,
            district,
            dob,
            educationInstitute,
            pincode,
            qualification
        } = req.body;

        const studentExists = await prisma.student.findUnique({
            where: {
                email
            },
        });

        if (studentExists) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Student with this email already exists",
                },
            };
        }

        await prisma.student.create({
            data: {
                uid,
                name,
                email,
                phoneNumber,
                gender,
                image,
                about,
                address,
                city,
                country,
                district,
                dob,
                educationInstitute,
                pincode,
                qualification,
            },
        });

        const tempPass = `${name}${crypto.randomBytes(8).toString('base64').replace(/[+/=]/g, "x")}`;

        await EmailService.sendEmail({
            to: email,
            subject: "Welcome to Student Portal",
            body: `<h1>Welcome ${name}!</h1><p>Your student profile has been created successfully.</p> 
            <p>You can now log in to the student portal using your email: ${email}</p>
            <p> Your temporary password is: <strong>${tempPass}</strong></p>
            <p>You can change your password after logging in for the first time.</p>
            <p>Please keep this information safe.</p>
            <p>Best regards,<br/>Student Portal Team</p>
            `,
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Student profile created succesfully",
            },
        };
    } catch (error) {
        console.error("Error creating student:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error" || error,
            },
        };
    }
};

const updateStudent: AppRouteMutationImplementation<
    typeof studentContract.updateStudent
> = async ({ req }) => {
    try {

        const { studentId } = req.params;

        const {
            name,
            email,
            phoneNumber,
            gender,
            image,
            about,
            address,
            city,
            country,
            district,
            dob,
            educationInstitute,
            pincode,
            qualification,
            status
        } = req.body;

        const studentExists = await prisma.student.findUnique({
            where: {
                id: studentId,
            },
        });

        if (!studentExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "student Not Found",
                },
            };
        }

        await prisma.student.update({
            where: {
                id: studentId,
            },
            data: {
                name,
                email,
                phoneNumber,
                gender,
                image,
                about,
                address,
                city,
                country,
                district,
                dob,
                educationInstitute,
                pincode,
                qualification,
                status
            },
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Student Account Updated Successfully",
            },
        };

    } catch (error) {
        console.log("Failed to update", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error" || error,
            },
        };
    }
};

const deleteStudent: AppRouteMutationImplementation<
    typeof studentContract.deleteStudent
> = async ({ req }) => {
    try {

        const { studentId } = req.params;

        const studentExists = await prisma.student.findUnique({
            where: { 
                id: studentId,
             },
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
            where: { 
                id: studentId,
             },
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

export const studentMutationHandlers = {
    createStudent,
    updateStudent,
    deleteStudent,
}