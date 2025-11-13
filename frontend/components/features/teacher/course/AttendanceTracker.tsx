import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Student {
  id: number;
  name: string;
  email: string;
  attendance: number;
  avatar: string;
}

interface AttendanceTrackerProps {
  courseId: string;
  courseTitle: string;
  students: Student[];
}

export function AttendanceTracker({
  courseId,
  courseTitle,
  students,
}: AttendanceTrackerProps) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const handleAttendanceChange = (
    studentId: number,
    date: string,
    isPresent: boolean
  ) => {
    const key = `${courseId}-${date}`;
    setAttendanceData((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [studentId]: isPresent,
      },
    }));
  };

  const getAttendanceForDate = (date: string) => {
    return attendanceData[`${courseId}-${date}`] || {};
  };

  const saveAttendance = () => {
    console.log(`Saving attendance for course ${courseId} on ${selectedDate}`);
    alert("Attendance saved successfully!");
  };

  const attendance = getAttendanceForDate(selectedDate);
  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = Object.values(attendance).filter(
    (val) => val === false
  ).length;
  const notMarkedCount = students.length - presentCount - absentCount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Daily Attendance Tracking</h3>
          <p className="text-muted-foreground">
            Mark student attendance for today's classes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </div>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{courseTitle}</CardTitle>
              <CardDescription>
                {students.length} students enrolled
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{presentCount} Present</span>
              </div>
              <div className="flex items-center space-x-1">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>{absentCount} Absent</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>{notMarkedCount} Not Marked</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-3">
              {students.map((student) => {
                const isPresent = attendance[student.id];
                const isAbsent = attendance[student.id] === false;

                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 border border-border/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={student.avatar || "/placeholder.svg"}
                          alt={student.name}
                        />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">{student.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-xs text-muted-foreground">
                        Overall: {student.attendance}%
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={isPresent ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            handleAttendanceChange(
                              student.id,
                              selectedDate,
                              true
                            )
                          }
                          className="h-8"
                        >
                          <UserCheck className="h-3 w-3 mr-1" />
                          Present
                        </Button>
                        <Button
                          variant={isAbsent ? "destructive" : "outline"}
                          size="sm"
                          onClick={() =>
                            handleAttendanceChange(
                              student.id,
                              selectedDate,
                              false
                            )
                          }
                          className="h-8"
                        >
                          <UserX className="h-3 w-3 mr-1" />
                          Absent
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/40">
              <div className="text-sm text-muted-foreground">
                Attendance for {new Date(selectedDate).toLocaleDateString()}
              </div>
              <Button onClick={saveAttendance}>Save Attendance</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
