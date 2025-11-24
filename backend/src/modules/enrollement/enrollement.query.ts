import { AppRouteQueryImplementation } from "@ts-rest/express";
import { enrollementRequestContract } from "../../contract/enrollement/enrollement.contract";
import prisma from "../../libs/db";

const getAllEnrollementRequest: AppRouteQueryImplementation<
    typeof enrollementRequestContract.getAllEnrollementRequest
> = async ({ req }) => {
    try {

        const { status } = req.query;

        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;

        const safePage = Math.max(page, 1);
        const safePageSize = Math.max(pageSize, 1);

        const [enrollementRequest, total] = await Promise.all([
            prisma.enrolledCourses.findMany({
                where: status ? { status } : {},
                skip: (safePage - 1) * safePageSize,
                take: safePageSize,
                include: {
                    course: {
                        include: {
                            teacher: true
                        }
                    },
                    student: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                },
            }),
            prisma.enrolledCourses.count({
                where: status ? { status } : {},
            }),
        ]);

        return {
            status: 200,
            body: {
                enrollementData: enrollementRequest.map((enrollement) => ({
                    id: enrollement.id,
                    paymentURL: enrollement.paymentURL,
                    status: enrollement.status,
                    course: {
                        id: enrollement.course.id,
                        title: enrollement.course.title,
                        description: enrollement.course.description,
                        teacher: enrollement.course.teacher
                            ? {
                                id: enrollement.course.teacher.id,
                                name: enrollement.course.teacher.name,
                            } : null,
                        createdAt: enrollement.course.createdAt,
                    },
                    student: {
                        id: enrollement.student.id,
                        name: enrollement.student.name,
                        email: enrollement.student.email,
                    },
                })),
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total,
                    totalPages: Math.ceil(total / safePageSize),
                },
            },
        };
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const getAllEnrollementRequestForStudent: AppRouteQueryImplementation<
    typeof enrollementRequestContract.getAllEnrollementRequestForStudent
> = async ({ req }) => {
    try {

        const {
            studentId
        } = req.params;

        const {
            status,
        } = req.query;

        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;

        const safePage = Math.max(page, 1);
        const safePageSize = Math.max(pageSize, 1);

        const [studentEnrollement, total] = await Promise.all([
            prisma.enrolledCourses.findMany({
                where: {
                    studentId,
                    ...(status ? { status } : {}),
                },
                skip: (safePage - 1) * safePageSize,
                take: safePageSize,
                select: {
                    id: true,
                    studentId: true,
                    paymentURL: true,
                    status: true,
                    rejectionReason: true,
                    course: {
                        select: {
                            id: true,
                            title: true,
                            createdAt: true,
                            updatedAt: true,
                            teacher: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            }),
            prisma.enrolledCourses.count({
                where: {
                    studentId,
                    ...(status ? { status } : {}),
                },
            }),
        ]);

        return {
            status: 200,
            body: {
                enrollementData: studentEnrollement.map((enrollement) => ({
                    id: enrollement.id,
                    studentId: enrollement.studentId,
                    paymentURL: enrollement.paymentURL,
                    status: enrollement.status,
                    rejectionReason: enrollement.rejectionReason,
                    course: {
                        id: enrollement.course.id,
                        title: enrollement.course.title,
                        teacher: enrollement.course.teacher
                            ? {
                                id: enrollement.course.teacher.id,
                                name: enrollement.course.teacher?.name,
                            } : null,
                        createdAt: enrollement.course.createdAt,
                        updatedAt: enrollement.course.updatedAt,
                    },
                })),
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total,
                    totalPages: Math.ceil(total / safePageSize),
                },
            },

        };

    } catch (error) {
        console.error("Failed to get course enrollement:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Ineternal Server Error",
            },
        };
    }
};

const searchEnrollementForStudent: AppRouteQueryImplementation<
    typeof enrollementRequestContract.searchEnrollementForStudent
> = async ({ req }) => {
    try {

        const {
            search,
        } = req.query;

        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;

        const safePage = Math.max(page, 1);
        const safePageSize = Math.max(pageSize, 1);

        const {
            studentId
        } = req.params;

        const [searchResults, total] = await Promise.all([
            prisma.enrolledCourses.findMany({
                where: {
                    studentId,
                    OR: search
                        ? [
                            {
                                course: {
                                    title: {
                                        contains: search,
                                        mode: "insensitive"
                                    }
                                }
                            },
                            {
                                course: {
                                    teacher: {
                                        name: {
                                            contains: search,
                                            mode: "insensitive"
                                        }
                                    }
                                }
                            },
                        ]
                        : undefined,
                },
                skip: (safePage - 1) * safePageSize,
                take: safePageSize,
                include: {
                    course: {
                        include: {
                            teacher: true
                        }
                    }
                },
            }),
            prisma.enrolledCourses.count({
                where: {
                    studentId,
                    OR: search
                        ? [
                            {
                                course: {
                                    title: {
                                        contains: search,
                                        mode: "insensitive"
                                    }
                                }
                            },
                            {
                                course: {
                                    teacher: {
                                        name: {
                                            contains: search,
                                            mode: "insensitive"
                                        }
                                    }
                                }
                            },
                        ]
                        : undefined,
                },
            }),
        ]);

        return {
            status: 200,
            body: {
                enrollementData: searchResults.map((enrollement) => ({
                    id: enrollement.id,
                    studentId: enrollement.studentId,
                    paymentURL: enrollement.paymentURL,
                    status: enrollement.status,
                    rejectionReason: enrollement.rejectionReason,
                    course: {
                        id: enrollement.course.id,
                        title: enrollement.course.title,
                        teacher: enrollement.course.teacher
                            ? {
                                id: enrollement.course.teacher.id,
                                name: enrollement.course.teacher.name,
                            } : null,
                        createdAt: enrollement.course.createdAt,
                        updatedAt: enrollement.course.updatedAt,
                    },
                })),
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total,
                    totalPages: Math.ceil(total / safePageSize),
                },
            },
        };

    } catch (error) {
        console.error("Failed to search:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

export const enrolledCourseQueryHandlers = {
    getAllEnrollementRequest,
    getAllEnrollementRequestForStudent,
    searchEnrollementForStudent,
} 