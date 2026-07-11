import { AppRouteMutationImplementation } from "@ts-rest/express";
import { courseAnnouncementContract } from "../../contract/announcement/courseAnnouncement.contract";
import prisma from "../../libs/db";
import { sendAnnouncementEmail } from "../../libs/email.service";

const createCourseAnnouncement: AppRouteMutationImplementation<
  typeof courseAnnouncementContract.createCourseAnnouncement
> = async ({ req }) => {
  try {
    const { teacherId, courseId } = req.params;
    const { title, message, attachments, externalLinks, isPinned, publishDate, expiryDate, sendEmail } = req.body;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { teacherId: true, title: true },
    });

    if (!course) {
      return { status: 404, body: { success: false, error: "Course not found" } };
    }

    if (course.teacherId !== teacherId) {
      return { status: 403, body: { success: false, error: "You don't own this course" } };
    }

    await prisma.announcement.create({
      data: {
        courseId,
        title,
        message,
        attachments: attachments ?? undefined,
        externalLinks: externalLinks ?? [],
        isPinned: isPinned ?? false,
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        createdById: teacherId,
        creatorRole: "teacher",
        target: "COURSE_STUDENTS",
      },
    });

    if (sendEmail) {
      prisma.teacher.findUnique({
        where: { id: teacherId },
        select: { name: true },
      }).then((teacher) => {
        sendAnnouncementEmail(
          {
            title,
            message,
            creatorName: teacher?.name || "Teacher",
            creatorRole: "teacher",
            externalLinks: externalLinks ?? undefined,
            courseName: course.title,
          },
          "COURSE_STUDENTS",
          courseId
        ).catch((err) => console.error("Failed to send announcement emails:", err));
      });
    }

    return { status: 201, body: { success: true, message: "Announcement created successfully" } };
  } catch (error) {
    console.error("Error creating course announcement:", error);
    return { status: 500, body: { success: false, error: "Internal Server Error" } };
  }
};

const updateCourseAnnouncement: AppRouteMutationImplementation<
  typeof courseAnnouncementContract.updateCourseAnnouncement
> = async ({ req }) => {
  try {
    const { announcementId } = req.params;
    const { title, message, attachments, externalLinks, isPinned, publishDate, expiryDate } = req.body;

    const existing = await prisma.announcement.findUnique({ where: { id: announcementId } });

    if (!existing) {
      return { status: 404, body: { success: false, error: "Announcement not found" } };
    }

    await prisma.announcement.update({
      where: { id: announcementId },
      data: {
        ...(title !== undefined && { title }),
        ...(message !== undefined && { message }),
        ...(attachments !== undefined && { attachments }),
        ...(externalLinks !== undefined && { externalLinks }),
        ...(isPinned !== undefined && { isPinned }),
        ...(publishDate !== undefined && { publishDate: new Date(publishDate) }),
        ...(expiryDate !== undefined && { expiryDate: expiryDate ? new Date(expiryDate) : null }),
      },
    });

    return { status: 200, body: { success: true, message: "Announcement updated successfully" } };
  } catch (error) {
    console.error("Error updating course announcement:", error);
    return { status: 500, body: { success: false, error: "Internal Server Error" } };
  }
};

const deleteCourseAnnouncement: AppRouteMutationImplementation<
  typeof courseAnnouncementContract.deleteCourseAnnouncement
> = async ({ req }) => {
  try {
    const { announcementId } = req.params;

    const existing = await prisma.announcement.findUnique({ where: { id: announcementId } });

    if (!existing) {
      return { status: 404, body: { success: false, error: "Announcement not found" } };
    }

    await prisma.announcement.delete({ where: { id: announcementId } });

    return { status: 200, body: { success: true, message: "Announcement deleted successfully" } };
  } catch (error) {
    console.error("Error deleting course announcement:", error);
    return { status: 500, body: { success: false, error: "Internal Server Error" } };
  }
};

export const courseAnnouncementMutationHandlers = {
  createCourseAnnouncement,
  updateCourseAnnouncement,
  deleteCourseAnnouncement,
};
