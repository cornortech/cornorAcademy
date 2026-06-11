"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mailer_1 = __importDefault(require("../libs/node.mailer"));
class EmailService {
    static async sendEmail({ to, subject, body }) {
        console.log(`Email sent to ${to} with subject "${subject}"`);
        await node_mailer_1.default.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html: body,
        });
    }
}
;
exports.default = EmailService;
