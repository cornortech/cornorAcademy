"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/api/axios";

interface EnrollmentItem {
  id: string;
  course: {
    id: string;
    title: string;
  };
  student: {
    id: string;
    name: string;
    email: string;
  };
  status: "requested" | "approved" | "rejected";
  createdAt?: string | Date;
  paymentURL?: string;
}

interface Props {
  enrollments?: EnrollmentItem[];
  teacherId?: string;
}

export function TeacherEnrollmentList({ enrollments, teacherId }: Props) {
  const [localEnrollments, setLocalEnrollments] = useState(enrollments || []);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (enrollments) {
      setLocalEnrollments(enrollments);
    }
  }, [enrollments]);

  const handleApprove = async (enrollment: EnrollmentItem) => {
    setProcessingId(enrollment.id);
    try {
      await axiosInstance.put("/enrollement", {
        studentId: enrollment.student.id,
        courseId: enrollment.course.id,
        status: "approved",
      });
      setLocalEnrollments((prev) =>
        prev.map((e) =>
          e.id === enrollment.id ? { ...e, status: "approved" } : e
        )
      );
    } catch (err) {
      console.error("Failed to approve enrollment", err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (enrollment: EnrollmentItem, reason?: string) => {
    setProcessingId(enrollment.id);
    try {
      await axiosInstance.put("/enrollement", {
        studentId: enrollment.student.id,
        courseId: enrollment.course.id,
        status: "rejected",
        rejectionReason: reason,
      });
      setLocalEnrollments((prev) =>
        prev.map((e) =>
          e.id === enrollment.id ? { ...e, status: "rejected" } : e
        )
      );
    } catch (err) {
      console.error("Failed to reject enrollment", err);
    } finally {
      setProcessingId(null);
    }
  };

  if (!localEnrollments || localEnrollments.length === 0) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Enrollment Requests</h1>
          <p className="text-muted-foreground">
            Review and manage student enrollment requests for your courses.
          </p>
        </div>
        <Card className="border-border/50 bg-card/50 backdrop-blur p-12 text-center">
          <p className="text-muted-foreground">No enrollment requests yet.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Enrollment Requests</h1>
        <p className="text-muted-foreground">
          Review and manage student enrollment requests for your courses.
        </p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left font-medium">Student</th>
                <th className="px-6 py-3 text-left font-medium">Course</th>
                <th className="px-6 py-3 text-left font-medium">Request Date</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localEnrollments.map((enrollment) => (
                <tr
                  key={enrollment.id}
                  className="border-b border-border/50 last:border-b-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{enrollment.student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {enrollment.student.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{enrollment.course.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        enrollment.status === "approved"
                          ? "default"
                          : enrollment.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {enrollment.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {processingId === enrollment.id ? (
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    ) : enrollment.status === "requested" ? (
                      <div className="flex items-center space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 hover:bg-green-100"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[400px]">
                            <DialogHeader>
                              <DialogTitle>Approve Enrollment Request</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <p className="text-sm">
                                Are you sure you want to approve{" "}
                                <strong>{enrollment.student.name}</strong> for{" "}
                                <strong>{enrollment.course.title}</strong>?
                              </p>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApprove(enrollment)}
                              >
                                Approve Enrollment
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <RejectDialog enrollment={enrollment} onReject={handleReject} />
                      </div>
                    ) : enrollment.status === "approved" ? (
                      <Badge variant="default" className="w-full justify-center">
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="w-full justify-center">
                        Rejected
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function RejectDialog({
  enrollment,
  onReject,
}: {
  enrollment: EnrollmentItem;
  onReject: (enrollment: EnrollmentItem, reason?: string) => Promise<void>;
}) {
  const [reason, setReason] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-red-50 hover:bg-red-100"
        >
          <AlertCircle className="h-4 w-4 text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Reject Enrollment Request</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p className="text-sm font-medium mb-2">
              Student: <strong>{enrollment.student.name}</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Course: <strong>{enrollment.course.title}</strong>
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">
                  Reason for Rejection (Optional)
                </Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Enter reason for rejecting this enrollment request..."
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            variant="destructive"
            onClick={() => onReject(enrollment, reason || undefined)}
          >
            Reject Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
