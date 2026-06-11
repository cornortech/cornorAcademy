"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQueryHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const getProfile = async ({ req }) => {
    try {
        const user = req.user;
        if (!user) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "User not found"
                },
            };
        }
        ;
        let image = null;
        let status = null;
        if (user.role === "student") {
            const student = await db_1.default.student.findUnique({
                where: {
                    id: user.id,
                },
                select: {
                    image: true,
                    status: true,
                },
            });
            if (student) {
                image = student.image;
                status = student.status;
            }
        }
        else if (user.role === "teacher") {
            const teacher = await db_1.default.teacher.findUnique({
                where: {
                    id: user.id
                }
            });
            if (teacher) {
                image = teacher.image;
                status = teacher.status;
            }
        }
        return {
            status: 200,
            body: {
                userId: user.id,
                uid: user.uid,
                email: user.email,
                image,
                status,
                role: user.role,
            },
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error."
            },
        };
    }
};
exports.authQueryHandlers = {
    getProfile
};
