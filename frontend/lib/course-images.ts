import { mockCourseImages } from "@/lib/data";
import { CourseCategory } from "@/types";

interface GetCourseImageOptions {
  thumbnail?: string;
  category?: CourseCategory;
  title?: string;
}

const categoryImageMap: Record<CourseCategory, string> = {
  WebDevelopment: mockCourseImages.webDevelopment,
  ui: mockCourseImages.uiUx,
  DataScience: mockCourseImages.dataScience,
  DigitalMarketing: mockCourseImages.digitalMarketing,
};

export function getCourseImage({ thumbnail, category }: GetCourseImageOptions) {
  if (thumbnail) {
    return thumbnail;
  }

  if (category && categoryImageMap[category]) {
    return categoryImageMap[category];
  }

  return mockCourseImages.webDevelopment;
}
