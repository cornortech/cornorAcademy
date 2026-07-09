import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial();
