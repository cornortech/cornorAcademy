"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Video,
  Calendar,
  Mail,
  ExternalLink,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CountdownTimer } from "./CountdownTimer";
import { useSendLiveClassReminder } from "@/api/course";
import type { Course } from "@/api/course";

interface LiveClassViewProps {
  course: Course;
}

export function LiveClassView({ course }: LiveClassViewProps) {
  const [showMeetingLink, setShowMeetingLink] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);
  const sendReminder = useSendLiveClassReminder();

  const meetingTime = course.meetingTime ? new Date(course.meetingTime) : new Date();
  const now = new Date();
  const diffToStart = meetingTime.getTime() - now.getTime();
  const hasStarted = diffToStart <= 0;
  const withinWindow = diffToStart <= 15 * 60 * 1000 && diffToStart > -60 * 60 * 1000;

  useEffect(() => {
    if (withinWindow && !reminderSent && !hasStarted) {
      setShowMeetingLink(true);
      sendReminder.mutate(course.id);
      setReminderSent(true);
    }
    if (hasStarted) {
      setShowMeetingLink(true);
    }
  }, [withinWindow, hasStarted, reminderSent, course.id, sendReminder]);

  const countdownLabel = hasStarted
    ? "Class is ongoing"
    : diffToStart > 24 * 60 * 60 * 1000
    ? "Starts in"
    : "Starts in";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
            </Button>
            <div className="h-5 w-px bg-border" />
            <span className="text-sm font-medium truncate max-w-md">
              {course.title}
            </span>
          </div>
          <Badge variant="default" className="gap-1">
            <Video className="h-3 w-3" />
            Live Class
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-lg overflow-hidden aspect-video bg-muted">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>

            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">What You&apos;ll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.whatYouWillLearn.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Syllabus & Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Class Date</p>
                      <p className="text-sm text-muted-foreground">
                        {meetingTime.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Class Time</p>
                      <p className="text-sm text-muted-foreground">
                        {meetingTime.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(
                          meetingTime.getTime() + (course.duration || 60) * 60 * 1000
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  {course.requirements && course.requirements.length > 0 && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-1">Requirements</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {course.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <CountdownTimer
                  targetDate={meetingTime}
                  label={countdownLabel}
                />

                <Separator />

                {!showMeetingLink ? (
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Clock className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Meeting link not yet available</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        The meeting link will appear here and will be sent to your registered
                        email {15} minutes before the class starts.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-500/10 rounded-lg px-3 py-2">
                      <Video className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {hasStarted ? "Join the class" : "Meeting link available"}
                      </span>
                    </div>

                    <Button className="w-full" size="lg" asChild>
                      <a
                        href={course.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Join Meeting
                      </a>
                    </Button>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                      <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                      <p>
                        The meeting link has also been sent to your registered email address.
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="text-center text-xs text-muted-foreground">
                  <p className="flex items-center justify-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {course.level === "beginner"
                      ? "Beginner friendly"
                      : course.level === "intermediate"
                      ? "Intermediate level"
                      : "Advanced level"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
