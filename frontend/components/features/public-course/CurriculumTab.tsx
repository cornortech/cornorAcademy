"use client";

import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight, PlayCircle } from "lucide-react";

interface TabProps {
  course: any;
}

export function CurriculumTab({ course }: TabProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set([0])
  );

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const totalLessons = course.modules.reduce(
    (sum: number, m: any) => sum + m.lessons,
    0
  );

  return (
    <TabsContent value="curriculum" className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Course Content</h3>
        <span className="text-sm text-muted-foreground">
          {course.modules.length} modules • {totalLessons} lessons
        </span>
      </div>

      {course.modules.map((module: any, index: number) => {
        const isExpanded = expandedModules.has(index);
        return (
          <Card key={index} className="border-border/50 overflow-hidden">
            <button
              onClick={() => toggleModule(index)}
              className="w-full"
            >
              <CardHeader className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                    <CardTitle className="text-base">
                      {index + 1}. {module.title}
                    </CardTitle>
                  </div>
                  <div className="text-sm text-muted-foreground shrink-0">
                    {module.lessons} lessons • {module.duration}
                  </div>
                </div>
              </CardHeader>
            </button>

            {isExpanded && module.content && module.content.length > 0 && (
              <div className="border-t border-border/50 bg-muted/30 px-4 py-3">
                <ul className="space-y-2">
                  {module.content.map((lesson: string, lessonIndex: number) => (
                    <li
                      key={lessonIndex}
                      className="flex items-center gap-3 text-sm py-1"
                    >
                      <PlayCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        );
      })}
    </TabsContent>
  );
}
