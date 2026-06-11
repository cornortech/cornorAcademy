"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupExpiredTokens = exports.deleteVerificationToken = exports.verifyToken = exports.sendVerificationEmail = exports.createVerificationToken = exports.generateVerificationToken = void 0;
const node_mailer_1 = __importDefault(require("./node.mailer"));
const db_1 = __importDefault(require("./db"));
const crypto_1 = __importDefault(require("crypto"));
const VERIFICATION_LINK_EXPIRY_HOURS = 24;
/**
 * Generate a verification token for email verification
 */
const generateVerificationToken = () => {
    return crypto_1.default.randomBytes(32).toString("hex");
};
exports.generateVerificationToken = generateVerificationToken;
/**
 * Create and store a verification token in the database
 */
const createVerificationToken = async (email) => {
    const token = (0, exports.generateVerificationToken)();
    const expiresAt = new Date(Date.now() + VERIFICATION_LINK_EXPIRY_HOURS * 60 * 60 * 1000);
    await db_1.default.verificationToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });
    return token;
};
exports.createVerificationToken = createVerificationToken;
/**
 * Send verification email to user
 */
const sendVerificationEmail = async (email, name, verificationLink) => {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .button { background: #a855f7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 15px 0; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to CornorAcademy! 🎓</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for signing up! We're excited to have you join our learning community.</p>
            <p>To complete your registration, please verify your email address by clicking the button below:</p>
            <center>
              <a href="${verificationLink}" class="button">Verify Email Address</a>
            </center>
            <p>Or copy and paste this link in your browser:</p>
            <p><code style="background: #f0f0f0; padding: 10px; word-break: break-all;">${verificationLink}</code></p>
            <div class="warning">
              <strong>⏰ This link will expire in 24 hours</strong>
            </div>
            <p>If you didn't create this account, you can safely ignore this email.</p>
            <p>Questions? Contact us at support@cornor.academy</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 CornorAcademy. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this address.</p>
          </div>
        </div>
      </body>
    </html>
  `;
    try {
        await node_mailer_1.default.sendMail({
            from: `"Cornor Academy" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Verify Your CornorAcademy Email",
            html: htmlTemplate,
            text: `Hi ${name},\n\nClick this link to verify your email: ${verificationLink}\n\nThis link expires in 24 hours.\n\nThank you!`,
        });
        console.log(`✅ Verification email sent to ${email}`);
    }
    catch (error) {
        console.error(`❌ Failed to send verification email to ${email}:`, error);
        throw new Error("Failed to send verification email");
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
/**
 * Verify a token and return the email if valid
 */
const verifyToken = async (token) => {
    const verificationToken = await db_1.default.verificationToken.findUnique({
        where: { token },
    });
    if (!verificationToken) {
        return null;
    }
    // Check if token has expired
    if (new Date() > verificationToken.expiresAt) {
        // Delete expired token
        await db_1.default.verificationToken.delete({
            where: { id: verificationToken.id },
        });
        return null;
    }
    return verificationToken.email;
};
exports.verifyToken = verifyToken;
/**
 * Delete a verification token after successful verification
 */
const deleteVerificationToken = async (token) => {
    await db_1.default.verificationToken.deleteMany({
        where: { token },
    });
};
exports.deleteVerificationToken = deleteVerificationToken;
/**
 * Clean up expired tokens (run periodically)
 */
const cleanupExpiredTokens = async () => {
    const result = await db_1.default.verificationToken.deleteMany({
        where: {
            expiresAt: {
                lt: new Date(),
            },
        },
    });
    console.log(`🧹 Cleaned up ${result.count} expired verification tokens`);
    return result.count;
};
exports.cleanupExpiredTokens = cleanupExpiredTokens;
