import { AppRouteMutationImplementation } from "@ts-rest/express";
import { teacherContract } from "../../contract/teacher/teacher.contract";
import prisma from "../../libs/db";
import crypto from "crypto";
import EmailService from "../../services/email.service";
import admin from "../../libs/admin";

//Generate teacher side random paswowrd for first login
function generateTempPassword(name: string) {
    const firstLetter = name.trim()[0].toLowerCase();

    const randomPass = crypto.randomBytes(6).toString("base64");

    const safeRandom = randomPass.replace(/[+/]/g, () =>
        Math.floor(Math.random() * 10).toString()
    );

    return `${firstLetter}.${safeRandom}`;
}

const createTeacher: AppRouteMutationImplementation<
    typeof teacherContract.createTeacher
> = async ({ req }) => {

    let teacherFirebase: admin.auth.UserRecord | null = null;

    try {

        const {
            name,
            email,
            image,
            bio,
            noOfYearsExperience,
            expertise,
            dob,
            gender
        } = req.body;

        const teacherExists = await prisma.teacher.findUnique({
            where: {
                email
            }
        });

        if (teacherExists) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Teacher profile with this email already exists",
                }
            }
        };

        const tempPassword = generateTempPassword(name);

        teacherFirebase = await admin.auth().createUser({
            email,
            password: tempPassword,
        });

        await prisma.teacher.create({
            data: {
                uid: teacherFirebase.uid,
                name,
                email,
                image,
                bio,
                noOfYearsExperience,
                expertise,
                dob,
                gender,
            },
        });

        await EmailService.sendEmail({
            to: email,
            subject: "Welcome to Academy Teacher Portal",
            body:
                `<h1>Welcome ${name}!</h1><p>Your teacher profile has been created successfully.</p> 

        <p>You can now log in to the teacher account portal using Email: ${email}</p>
        <p><strong>Your temporary password is: <strong> ${tempPassword}</p>

       <p>Please keep this information safe.</p>
        <p>Best regards,<br/>Teacher Portal Team</p>
    `,
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

        if(teacherFirebase) {
            await admin.auth().deleteUser(teacherFirebase.uid);
        };

        await prisma.teacher.deleteMany({
            where: {
                email: req.body.email,
            },
        });
        
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

const deleteTeacher: AppRouteMutationImplementation<
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