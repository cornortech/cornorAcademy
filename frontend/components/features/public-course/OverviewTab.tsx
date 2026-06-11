import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CheckCircle } from "lucide-react";

interface TabProps {
  course: any;
}

export function OverviewTab({ course }: TabProps) {
  return (
    <TabsContent value="overview" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About This Course</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {course.longDescription}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">What You'll Learn</h4>
              <ul className="space-y-2">
                {course.outcomes.map((outcome: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Requirements</h4>
              <ul className="space-y-2">
                {course.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
