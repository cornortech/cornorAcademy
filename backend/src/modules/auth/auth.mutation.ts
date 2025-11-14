import { AppRouteMutationImplementation } from "@ts-rest/express";
import { authContract } from "../../contract/auth/auth.contract";
import prisma from "../../libs/db";

const registerStudent: AppRouteMutationImplementation<
    typeof authContract.registerStudent
> = async ({ req }) => {
    try {

        const {
            uid,
            name,
            email,
            phoneNumber,
            gender,
            image,
            dob,
            address,
            city,
            district,
            pincode,
            country,
            about,
            educationInstitute,
            qualification,
        } = req.body;

        const studentExists = await prisma.student.findUnique({
            where: {
                uid,
                email,
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
        };

        const newStudent = await prisma.student.create({
            data: {
                uid,
                name,
                email,
                phoneNumber,
                gender,
                image,
                dob,
                address,
                city,
                district,
                pincode,
                country,
                about,
                educationInstitute,
                qualification,
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                studentId: newStudent.id,
                message: "Account created successfully",
            },
        };

    } catch (error) {
        console.error("Error creating student:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error",
            },
        };
    }
};

const login: AppRouteMutationImplementation<
    typeof authContract.login
> = async ({ req }) => {
    try {

        const {
            email,
            password,
        } = req.body;

        const student = await prisma.student.findUnique({
            where: {
                email,
            },
        });

        const teacher = await prisma.teacher.findUnique({
            where: {
                email,
            },
        });

        const admin = await prisma.student.findUnique({
            where: {
                email,
            },
        });

        const users = student || teacher || admin;

        let role: "student" | "teacher" | "admin";
        if (student) role = "student";
        else if (teacher) role = "teacher";
        else role = "admin";

        if (!users) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Email doesnot exists try again later",
                },
            };
        };

        if (role === "student" || role === "teacher") {
            const status = users.status;
            switch (status) {
                case "registered":
                    return {
                        status: 403,
                        body: {
                            success: false,
                            error: "Account is registered but not activated yet."
                        },
                    };

                case "portalActivated":
                    break;

                case "portalDeactivated":
                    return {
                        status: 403,
                        body: {
                            success: false,
                            error: "Platform access is deactivated."
                        },
                    };

                case "rejected":
                    return {
                        status: 403,
                        body: {
                            success: false,
                            error: "Registration rejected."
                        },
                    };

                default:
                    return {
                        status: 500,
                        body: {
                            success: false,
                            error: "Unknown status."
                        },
                    };
            }
        };

        return {
            status: 200,
            body: {
                uid: users.uid || "",
                id: users.id,
                name: users.name,
                email: users.email,
                role,
                status: (role === "student" || role === "teacher") ? users.status : undefined,
            },
        };

    } catch (error) {
        console.error("Error Login:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error" || error,
            },
        };
    }
};

const updateStudentDetails: AppRouteMutationImplementation<
    typeof authContract.updateStudentDetails
> = async ({ req }) => {
    try {

        const studentId = req.user!.id;

        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            },
        });

        if (!student) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Student not found",
                },
            }
        };

        const {
            name,
            email,
            phoneNumber,
            gender,
            image,
            dob,
            address,
            city,
            district,
            pincode,
            country,
            about,
            educationInstitute,
            qualification,
        } = req.body;

        const updateData: any = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email.toLowerCase();
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (gender) updateData.gender = gender;
        if (image) updateData.image = image;
        if (dob) updateData.dob = dob;
        if (address) updateData.address = address;
        if (city) updateData.city = city;
        if (district) updateData.district = district;
        if (pincode) updateData.pincode = pincode;
        if (country) updateData.country = country;
        if (about) updateData.about = about;
        if (educationInstitute) updateData.educationInstitute = educationInstitute;
        if (qualification) updateData.qualification = qualification;

        await prisma.student.update({
            where: {
                id: studentId
            },
            data: updateData,
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Account updated successfully",
            }
        }

    } catch (error) {
        console.error("Error updating student details:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error",
            },
        };
    }
};

export const authMutationHandlers = {
    registerStudent,
    login,
    updateStudentDetails,
}