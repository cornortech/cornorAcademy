import { AppRouteQueryImplementation } from "@ts-rest/express";
import { courseAnnouncementContract } from "../../contract/announcement/courseAnnouncement.contract";
import prisma from "../../libs/db";

const getCourseAnnouncements: AppRouteQueryImplementation<
  typeof courseAnnouncementContract.getCourseAnnouncements
> = async ({ req }) => {
  try {
    const { courseId } = req.params;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true },
    });

    if (!course) {
      return {
        status: 404,
        body: { success: false, error: "Course not found" },
      };
    }

    const dbAnnouncements = await prisma.announcement.findMany({
      where: {
        OR: [
          { courseId },
          { target: "EVERYONE" },
          { target: "ALL_STUDENTS" },
          { target: "ALL_TEACHERS" },
          { target: "SPECIFIC_COURSE", courseId },
        ],
      },
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
        courseId: a.courseId ?? courseId,
        courseName: course.title,
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
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching course announcements:", error);
    return {
      status: 500,
      body: { success: false, error: "Internal Server Error" },
    };
  }
};

export const courseAnnouncementQueryHandlers = {
  getCourseAnnouncements,
};
