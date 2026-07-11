import { AppRouteMutationImplementation } from "@ts-rest/express";
import { platformAnnouncementContract } from "../../contract/announcement/platformAnnouncement.contract";
import prisma from "../../libs/db";
import { sendAnnouncementEmail } from "../../libs/email.service";

const createAnnouncement: AppRouteMutationImplementation<
  typeof platformAnnouncementContract.createAnnouncement
> = async ({ req }) => {
  try {
    const { title, message, attachments, externalLinks, isPinned, publishDate, expiryDate, target, courseId, targetUserId, sendEmail } = req.body;

    const createdById = req.user?.id || "system";
    const creatorRole = req.user?.role || "admin";

    if (target === "SPECIFIC_COURSE" && !courseId) {
      return { status: 400, body: { success: false, error: "courseId is required when targeting a specific course" } };
    }

    if (target === "INDIVIDUAL_USER" && !targetUserId) {
      return { status: 400, body: { success: false, error: "targetUserId is required when targeting an individual user" } };
    }

    await prisma.announcement.create({
      data: {
        title,
        message,
        attachments: attachments ?? undefined,
        externalLinks: externalLinks ?? [],
        isPinned: isPinned ?? false,
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        createdById,
        creatorRole,
        target,
        courseId: courseId ?? null,
        targetUserId: targetUserId ?? null,
      },
    });

    if (sendEmail) {
      const creatorName = req.user?.email || "System";
      let courseName: string | undefined;

      if (courseId) {
        const course = await prisma.course.findUnique({ where: { id: courseId }, select: { title: true } });
        courseName = course?.title;
      }

      sendAnnouncementEmail(
        { title, message, creatorName, creatorRole, externalLinks: externalLinks ?? undefined, courseName },
        target,
        courseId ?? null,
        targetUserId ?? null
      ).catch((err) => console.error("Failed to send announcement emails:", err));
    }

    return { status: 201, body: { success: true, message: "Announcement created successfully" } };
  } catch (error) {
    console.error("Error creating announcement:", error);
    return { status: 500, body: { success: false, error: "Internal Server Error" } };
  }
};

const updateAnnouncement: AppRouteMutationImplementation<
  typeof platformAnnouncementContract.updateAnnouncement
> = async ({ req }) => {
  try {
    const { id } = req.params;
    const { title, message, attachments, externalLinks, isPinned, publishDate, expiryDate, target, courseId, targetUserId } = req.body;

    const existing = await prisma.announcement.findUnique({ where: { id } });

    if (!existing) {
      return { status: 404, body: { success: false, error: "Announcement not found" } };
    }

    await prisma.announcement.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(message !== undefined && { message }),
        ...(attachments !== undefined && { attachments }),
        ...(externalLinks !== undefined && { externalLinks }),
        ...(isPinned !== undefined && { isPinned }),
        ...(publishDate !== undefined && { publishDate: new Date(publishDate) }),
        ...(expiryDate !== undefined && { expiryDate: expiryDate ? new Date(expiryDate) : null }),
        ...(target !== undefined && { target }),
        ...(courseId !== undefined && { courseId }),
        ...(targetUserId !== undefined && { targetUserId }),
      },
    });

    return { status: 200, body: { success: true, message: "Announcement updated successfully" } };
  } catch (error) {
    console.error("Error updating announcement:", error);
    return { status: 500, body: { success: false, error: "Internal Server Error" } };
  }
};

const deleteAnnouncement: AppRouteMutationImplementation<
  typeof platformAnnouncementContract.deleteAnnouncement
> = async ({ req }) => {
  try {
    const { id } = req.params;

    const existing = await prisma.announcement.findUnique({ where: { id } });

    if (!existing) {
      return { status: 404, body: { success: false, error: "Announcement not found" } };
    }

    await prisma.announcement.delete({ where: { id } });

    return { status: 200, body: { success: true, message: "Announcement deleted successfully" } };
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return { status: 500, body: { success: false, error: "Internal Server Error" } };
  }
};

export const platformAnnouncementMutationHandlers = {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
