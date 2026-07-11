import transporter from "./node.mailer";
import prisma from "./db";
import crypto from "crypto";

const VERIFICATION_LINK_EXPIRY_HOURS = 24;

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const createVerificationToken = async (email: string, uid?: string): Promise<string> => {
  const token = generateVerificationToken();
  const expiresAt = new Date(Date.now() + VERIFICATION_LINK_EXPIRY_HOURS * 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      email,
      uid,
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

export const verifyToken = async (token: string): Promise<{ email: string; uid: string | null } | null> => {
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

  return { email: verificationToken.email, uid: verificationToken.uid };
};

export const deleteVerificationToken = async (token: string): Promise<void> => {
  await prisma.verificationToken.deleteMany({
    where: { token },
  });
};

interface AnnouncementEmailPayload {
  title: string;
  message: string;
  creatorName: string;
  creatorRole: string;
  externalLinks?: string[];
  courseName?: string;
}

async function getRecipients(
  target: string,
  courseId?: string | null,
  targetUserId?: string | null
): Promise<{ email: string; name: string }[]> {
  switch (target) {
    case "EVERYONE": {
      const [students, teachers] = await Promise.all([
        prisma.student.findMany({ select: { email: true, name: true } }),
        prisma.teacher.findMany({ select: { email: true, name: true } }),
      ]);
      return [...students, ...teachers];
    }
    case "ALL_STUDENTS": {
      const students = await prisma.student.findMany({ select: { email: true, name: true } });
      return students;
    }
    case "ALL_TEACHERS": {
      const teachers = await prisma.teacher.findMany({ select: { email: true, name: true } });
      return teachers;
    }
    case "SPECIFIC_COURSE":
    case "COURSE_STUDENTS": {
      if (!courseId) return [];
      const enrollments = await prisma.enrolledCourses.findMany({
        where: { courseId, status: "approved" },
        select: { student: { select: { email: true, name: true } } },
      });
      return enrollments.map((e) => e.student).filter(Boolean);
    }
    case "INDIVIDUAL_USER": {
      if (!targetUserId) return [];
      const [student, teacher] = await Promise.all([
        prisma.student.findUnique({ where: { id: targetUserId }, select: { email: true, name: true } }),
        prisma.teacher.findUnique({ where: { id: targetUserId }, select: { email: true, name: true } }),
      ]);
      const user = student || teacher;
      return user ? [user] : [];
    }
    default:
      return [];
  }
}

export const sendAnnouncementEmail = async (
  payload: AnnouncementEmailPayload,
  target: string,
  courseId?: string | null,
  targetUserId?: string | null
): Promise<number> => {
  const recipients = await getRecipients(target, courseId, targetUserId);
  if (recipients.length === 0) return 0;

  const linksHtml = payload.externalLinks?.length
    ? `<div style="margin-top:16px"><p><strong>Links:</strong></p>${payload.externalLinks.map((l) => `<p><a href="${l}" style="color:#a855f7">${l}</a></p>`).join("")}</div>`
    : "";

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
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
          .announcement-box { background: white; border-left: 4px solid #a855f7; padding: 15px; margin: 15px 0; border-radius: 4px; }
          .meta { font-size: 12px; color: #999; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📢 New Announcement</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            ${payload.courseName ? `<p><strong>Course:</strong> ${payload.courseName}</p>` : ""}
            <div class="announcement-box">
              <h2 style="margin-top:0">${payload.title}</h2>
              <p>${payload.message}</p>
              ${linksHtml}
            </div>
            <div class="meta">
              Posted by ${payload.creatorName} (${payload.creatorRole})
            </div>
            <p style="margin-top:20px">Log in to the platform to view more details.</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 CornorAcademy. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this address.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  let sentCount = 0;
  for (const r of recipients) {
    try {
      await transporter.sendMail({
        from: `"Cornor Academy" <${process.env.SMTP_USER}>`,
        to: r.email,
        subject: `📢 ${payload.title}`,
        html: htmlTemplate,
        text: `${payload.title}\n\n${payload.message}\n\n— ${payload.creatorName} (${payload.creatorRole})`,
      });
      sentCount++;
    } catch (error) {
      console.error(`❌ Failed to send announcement email to ${r.email}:`, error);
    }
  }
  console.log(`✅ Announcement email sent to ${sentCount}/${recipients.length} recipients`);
  return sentCount;
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
