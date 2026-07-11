import { AppRouteQueryImplementation } from "@ts-rest/express";
import { platformAnnouncementContract } from "../../contract/announcement/platformAnnouncement.contract";
import prisma from "../../libs/db";

const getAllAnnouncements: AppRouteQueryImplementation<
  typeof platformAnnouncementContract.getAllAnnouncements
> = async ({ req }) => {
  try {
    const { target, isPinned, courseId, creatorRole, search } = req.query;

    const where: any = {};

    if (target) where.target = target;
    if (isPinned !== undefined) where.isPinned = isPinned;
    if (courseId) where.courseId = courseId;
    if (creatorRole) where.creatorRole = creatorRole;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    const dbAnnouncements = await prisma.announcement.findMany({
      where,
      include: { course: { select: { title: true } } },
      orderBy: [
        { isPinned: "desc" },
        { publishDate: "desc" },
      ],
    });

    return {
      status: 200,
      body: dbAnnouncements.map((a) => ({
        id: a.id,
        title: a.title,
        message: a.message,
        attachments: a.attachments as any[] | null,
        externalLinks: a.externalLinks,
        isPinned: a.isPinned,
        publishDate: a.publishDate,
        expiryDate: a.expiryDate,
        createdById: a.createdById,
        creatorRole: a.creatorRole,
        target: a.target as any,
        courseId: a.courseId,
        courseName: a.course?.title ?? null,
        targetUserId: a.targetUserId,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return {
      status: 500,
      body: { success: false, error: "Internal Server Error" },
    };
  }
};

const getAnnouncementById: AppRouteQueryImplementation<
  typeof platformAnnouncementContract.getAnnouncementById
> = async ({ req }) => {
  try {
    const { id } = req.params;

    const announcement = await prisma.announcement.findUnique({
      where: { id },
      include: { course: { select: { title: true } } },
    });

    if (!announcement) {
      return {
        status: 404,
        body: { success: false, error: "Announcement not found" },
      };
    }

    return {
      status: 200,
      body: {
        id: announcement.id,
        title: announcement.title,
        message: announcement.message,
        attachments: announcement.attachments as any[] | null,
        externalLinks: announcement.externalLinks,
        isPinned: announcement.isPinned,
        publishDate: announcement.publishDate,
        expiryDate: announcement.expiryDate,
        createdById: announcement.createdById,
        creatorRole: announcement.creatorRole,
        target: announcement.target as any,
        courseId: announcement.courseId,
        courseName: announcement.course?.title ?? null,
        targetUserId: announcement.targetUserId,
        createdAt: announcement.createdAt,
        updatedAt: announcement.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return {
      status: 500,
      body: { success: false, error: "Internal Server Error" },
    };
  }
};

export const platformAnnouncementQueryHandlers = {
  getAllAnnouncements,
  getAnnouncementById,
};
