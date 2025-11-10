import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/types";

interface TabProps {
  course: Course;
}

export function CurriculumTab({ course }: TabProps) {
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
}
