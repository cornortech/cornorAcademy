import { AppRouteMutationImplementation } from "@ts-rest/express";
import { authContract } from "../../contract/auth/auth.contract";
import prisma from "../../libs/db";
import { error } from "console";

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

type UserRole = "student" | "teacher" | "admin";

function getRedirectUrl(role: UserRole): string {
    switch (role) {
        case "admin":
            return "/admin/dashboard";
        case "teacher":
            return "/teacher/dashboard";
        case "student":
            return "/student/dashboard";
        default:
            return "/";
    }
}

const login: AppRouteMutationImplementation<
    typeof authContract.login
> = async ({ req }) => {
    try {
        const { email, password } = req.body;

        // Determine role early
        let role = req.user?.role;

        // Fetch users
        let user: any = await prisma.student.findUnique({
            where:
            {
                email
            }
        });

        if (user) role = "student";
        else {
            user = await prisma.teacher.findUnique({
                where:
                {
                    email
                }
            });
            if (user) role = "teacher";

            else {
                user = await prisma.admin.findUnique({
                    where:
                    {
                        email
                    }
                });
                role = "admin";
            }
        }

        if (!user) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Email does not exist, try again later",
                },
            };
        }

        if (role === "student") {
            switch (user.status) {
                case "registered":
                    return {
                        status: 200,
                        body: {
                            uid: user.uid || "",
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: "student",
                            status: user.status,
                            redirectionUrl: "/legal-agreement",
                        },
                    };
                case "portalActivated":
                    break; // allowed
                case "portalDeactivated":
                    return {
                        status: 403,
                        body: {
                            success: false,
                            error: "Student Platform access is deactivated",
                        },
                    };
                case "rejected":
                    return {
                        status: 403,
                        body: {
                            success: false,
                            error: "Student Registration rejected",
                        },
                    };
                default:
                    return {
                        status: 500,
                        body: {
                            success: false,
                            error: "Unknown status",
                        },
                    };
            }
        }

        if (role === "teacher") {
            switch (user.status) {
                case "registered":
                    return {
                        status: 403,
                        body: {
                            success: false,
                            error: "Teacher is not activated",
                        },
                    };
                case "portalActivated":
                    break; // allowed
                case "portalDeactivated":
                    return {
                        status: 403,
                        body: {
                            success: false,
                            error: "Teacher Platform access is deactivated",
                        },
                    };
                case "rejected":
                    return {
                        status: 403,
                        body: {
                            success: false,
                            error: "Teacher Registration rejected",
                        },
                    };
                default:
                    return {
                        status: 500,
                        body: {
                            success: false,
                            error: "Unknown status",
                        },
                    };
            }
        }

        if (role === "admin") {

        }

        return {
            status: 200,
            body: {
                uid: req.user?.uid!,
                id: user.id,
                name: (user as any).name || "",
                email: user.email,
                role: role || "admin",
                redirectionUrl: role ? getRedirectUrl(role) : "/",
                status: role === "admin" ? undefined : user.status,
            },
        };

    } catch (error) {
        console.error("Error Login:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error",
            },
        };
    }
};

const uploadLegalAgreement: AppRouteMutationImplementation<
    typeof authContract.uploadLegalAgreement
> = async ({ req }) => {

    try {

        const {
            studentId,
            agreementURL,
        } = req.body;

        const agreementExists = await prisma.courseAgreement.findFirst({
            where: {
                studentId,
            },
        });

        if (agreementExists) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Agreement Already Submitted",
                },
            }
        };

        const agreement = await prisma.courseAgreement.create({
            data: {
                studentId,
                agreementURL,
            },
        });

        await prisma.student.updateMany({
            where: {
                id: studentId,
            },
            data: {
                status: "portalActivated",
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Agreement Uploaded Successfully",
            },
        };

    } catch (error) {
        console.error("Error creating agreement:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
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
    uploadLegalAgreement,
}