import transporter from "./node.mailer";
import prisma from "./db";
import crypto from "crypto";

const VERIFICATION_LINK_EXPIRY_HOURS = 24;

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const createVerificationToken = async (email: string): Promise<string> => {
  const token = generateVerificationToken();
  const expiresAt = new Date(Date.now() + VERIFICATION_LINK_EXPIRY_HOURS * 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return token;
};

export const sendVerificationEmail = async (
  email: string,
  name: string,
  verificationLink: string
): Promise<void> => {
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
    await transporter.sendMail({
      from: `"Cornor Academy" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your CornorAcademy Email",
      html: htmlTemplate,
      text: `Hi ${name},\n\nClick this link to verify your email: ${verificationLink}\n\nThis link expires in 24 hours.\n\nThank you!`,
    });

    console.log(`✅ Verification email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send verification email to ${email}:`, error);
    throw new Error("Failed to send verification email");
  }
};

export const verifyToken = async (token: string): Promise<string | null> => {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return null;
  }

  if (new Date() > verificationToken.expiresAt) {
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    return null;
  }

  return verificationToken.email;
};

export const deleteVerificationToken = async (token: string): Promise<void> => {
  await prisma.verificationToken.deleteMany({
    where: { token },
  });
};

export const cleanupExpiredTokens = async (): Promise<number> => {
  const result = await prisma.verificationToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  console.log(`🧹 Cleaned up ${result.count} expired verification tokens`);
  return result.count;
};

export const sendLiveClassReminderEmail = async (
  email: string,
  name: string,
  courseTitle: string,
  meetingUrl: string,
  meetingTime: Date
): Promise<void> => {
  const formattedTime = meetingTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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
          .button { background: #a855f7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-size: 16px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
          .details { background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Live Class Reminder</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your live class is starting soon!</p>
            <div class="details">
              <p><strong>Course:</strong> ${courseTitle}</p>
              <p><strong>Start Time:</strong> ${formattedTime}</p>
              <p><strong>Meeting Link:</strong> <a href="${meetingUrl}">${meetingUrl}</a></p>
            </div>
            <center>
              <a href="${meetingUrl}" class="button">Join Class Now</a>
            </center>
            <p>Make sure you have a stable internet connection and join a few minutes early.</p>
            <p>If you have any issues, please contact support at support@cornor.academy</p>
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
    await transporter.sendMail({
      from: `"Cornor Academy" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🔔 Reminder: "${courseTitle}" starts soon!`,
      html: htmlTemplate,
      text: `Hi ${name},\n\n"${courseTitle}" starts at ${formattedTime}.\n\nJoin here: ${meetingUrl}\n\nHappy learning!`,
    });
    console.log(`✅ Live class reminder sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send live class reminder to ${email}:`, error);
  }
};
