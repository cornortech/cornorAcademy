"use client";

import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
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
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  courseId: string;
  studentId: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface Props {
  enrollments?: EnrollmentItem[];
}

export function EnrollmentRequestList({ enrollments }: Props) {
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
        studentId: enrollment.studentId,
        courseId: enrollment.courseId,
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
        studentId: enrollment.studentId,
        courseId: enrollment.courseId,
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
      <Card className="border-border/50 bg-card/50 backdrop-blur p-12 text-center">
        <p className="text-muted-foreground">No enrollment requests found.</p>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-3 text-left font-medium">Student Name</th>
              <th className="px-6 py-3 text-left font-medium">Course Title</th>
              <th className="px-6 py-3 text-left font-medium">Request Date</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localEnrollments.map((request) => (
              <tr
                key={request.id}
                className="border-b border-border/50 last:border-b-0 hover:bg-accent/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{request.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {request.studentEmail}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">{request.courseTitle}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {request.createdAt}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  {processingId === request.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : request.status === "pending" ? (
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
                            <DialogTitle>
                              Approve Enrollment Request
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <p className="text-sm font-medium mb-2">
                                Student: {request.studentName}
                              </p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Course: {request.courseTitle}
                              </p>
                              <p className="text-sm">
                                Are you sure you want to approve this
                                enrollment request? The student will be
                                automatically enrolled in the course.
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(request)}
                            >
                              Approve Enrollment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AdminRejectDialog request={request} onReject={handleReject} />
                    </div>
                  ) : request.status === "approved" ? (
                    <Badge
                      variant="default"
                      className="w-full justify-center"
                    >
                      Approved
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="w-full justify-center"
                    >
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
  );
}

function AdminRejectDialog({
  request,
  onReject,
}: {
  request: EnrollmentItem;
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
          <DialogTitle>
            Reject Enrollment Request
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p className="text-sm font-medium mb-2">
              Student: {request.studentName}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Course: {request.courseTitle}
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
            onClick={() => onReject(request, reason || undefined)}
          >
            Reject Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
