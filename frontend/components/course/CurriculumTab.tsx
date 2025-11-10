import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { getCourseData } from "@/data/mock/GetCourseData";

const CurriculumTab = ({ params }: { params: { courseId: string } }) => {
  const course = getCourseData(params.courseId);
  return (
    <TabsContent value="curriculum" className="space-y-4">
      {course.modules.map((module, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {index + 1}. {module.title}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {module.lessons} lessons • {module.duration}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </TabsContent>
  );
};

export default CurriculumTab;
