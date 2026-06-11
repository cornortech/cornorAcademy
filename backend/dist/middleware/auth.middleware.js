"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const admin_1 = __importDefault(require("../libs/admin"));
const db_1 = __importDefault(require("../libs/db"));
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodedToken = await admin_1.default.auth().verifyIdToken(token);
        const user = decodedToken;
        if (!user.email) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        const student = await db_1.default.student.findFirst({ where: { email: user.email } });
        if (student) {
            req.user = { email: user.email, id: student.id, role: "student", uid: user.uid };
            return next();
        }
        const teacher = await db_1.default.teacher.findFirst({ where: { email: user.email } });
        if (teacher) {
            req.user = { email: user.email, id: teacher.id, role: "teacher", uid: user.uid };
            return next();
        }
        const adminUser = await db_1.default.admin.findFirst({ where: { email: user.email } });
        if (adminUser) {
            req.user = { email: user.email, id: adminUser.id, role: "admin", uid: user.uid };
            return next();
        }
        return res.status(401).json({ message: "User not found in database" });
    }
    catch (error) {
        console.log("Authentication error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authenticate = authenticate;
