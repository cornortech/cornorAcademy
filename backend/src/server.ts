import app from "./app";
import { connectToDatabase } from "./libs/db";
import cron from "node-cron";
import prisma from "./libs/db";
import { sendLiveClassReminderEmail } from "./libs/email.service";

const PORT = process.env.PORT || 4000;

async function checkLiveClassReminders() {
  try {
    const now = new Date();
    const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);

    const courses = await prisma.course.findMany({
      where: {
        isOngoing: true,
        reminderSent: false,
        meetingTime: { gte: now, lte: fifteenMinutesFromNow },
      },
      include: {
        enrolledCourses: {
          where: { status: "approved" },
          include: { student: { select: { name: true, email: true } } },
        },
      },
    });

    for (const course of courses) {
      for (const enrollment of course.enrolledCourses) {
        await sendLiveClassReminderEmail(
          enrollment.student.email,
          enrollment.student.name,
          course.title,
          course.meetingUrl,
          course.meetingTime
        );
      }
      await prisma.course.update({
        where: { id: course.id },
        data: { reminderSent: true },
      });
      console.log(`✅ Reminders sent for course: ${course.title}`);
    }
  } catch (error) {
    console.error("Error checking live class reminders:", error);
  }
}

async function startServer() {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📚 Swagger Documentation: http://localhost:${PORT}/api-docs`);
        console.log(`📊 API Information: http://localhost:${PORT}/`);
    });

    try {
        await connectToDatabase();
        console.log(`✅ Database connected successfully`);

        cron.schedule("* * * * *", () => {
          checkLiveClassReminders();
        });
        console.log("⏰ Live class reminder cron job started (every minute)");
    } catch (err) {
        console.error("⚠️ Database connection failed:", err);
        console.log("📝 Note: Server is still running for API documentation and testing");
        console.log("🔧 APIs will return database errors until DB is connected");
    }
}

startServer();