"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock } from "lucide-react"
import type { Course } from "@/types"

interface UpcomingClassesWidgetProps {
  courses: Course[]
}

export function UpcomingClassesWidget({ courses }: UpcomingClassesWidgetProps) {
  const liveClasses = courses.filter((c) => c.isOngoing && c.status === "upcoming")

  if (liveClasses.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No upcoming live classes scheduled
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Classes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {liveClasses.map((class_) => {
          const startDate = new Date(class_.startDate)
          const meetingTime = class_.meetingTime ? new Date(class_.meetingTime) : startDate

          return (
            <div
              key={class_.id}
              className="p-3 border border-border/50 rounded-lg space-y-2"
            >
              <h4 className="font-medium text-sm">{class_.title}</h4>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {startDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {meetingTime.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {class_.enrolledStudentsCount || 0}
                </span>
              </div>
              {class_.meetingUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  asChild
                >
                  <a href={class_.meetingUrl} target="_blank" rel="noopener noreferrer">
                    Start Meeting
                  </a>
                </Button>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
