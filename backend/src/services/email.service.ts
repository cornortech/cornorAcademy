import transporter from "../libs/node.mailer";

class EmailService {
    static async sendEmail({ to, subject, body }: {
        to: string;
        subject: string;
        body: string;
    }) {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html: body,
        });
    }
};

export default EmailService;