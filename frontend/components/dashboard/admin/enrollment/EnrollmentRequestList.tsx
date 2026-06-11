import { Eye, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Props {
  enrollments?: any[];
}

export function EnrollmentRequestList({ enrollments: propEnrollments }: Props) {
  const enrollmentRequests = propEnrollments && propEnrollments.length > 0 ? propEnrollments : [
    {
      id: 1,
      studentName: "John Smith",
      studentEmail: "john.smith@email.com",
      courseTitle: "Web Development Fundamentals",
      courseId: 1,
      paymentScreenshotUrl: "/generic-payment-screenshot.png",
      status: "pending",
      createdAt: "2024-01-20",
      amount: 299,
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      studentEmail: "sarah.wilson@email.com",
      courseTitle: "Advanced JavaScript Concepts",
      courseId: 2,
      paymentScreenshotUrl: "/generic-payment-screenshot.png",
      status: "pending",
      createdAt: "2024-01-19",
      amount: 399,
    },
    {
      id: 3,
      studentName: "Michael Brown",
      studentEmail: "michael.brown@email.com",
      courseTitle: "React Development Mastery",
      courseId: 3,
      paymentScreenshotUrl: "/generic-payment-screenshot.png",
      status: "approved",
      createdAt: "2024-01-18",
      amount: 499,
    },
    {
      id: 4,
      studentName: "Emma Davis",
      studentEmail: "emma.davis@email.com",
      courseTitle: "Data Science Fundamentals",
      courseId: 4,
      paymentScreenshotUrl: "/generic-payment-screenshot.png",
      status: "rejected",
      createdAt: "2024-01-17",
      amount: 449,
    },
  ];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-3 text-left font-medium">Student Name</th>
              <th className="px-6 py-3 text-left font-medium">Course Title</th>
              <th className="px-6 py-3 text-left font-medium">Request Date</th>
              <th className="px-6 py-3 text-left font-medium">
                Payment Screenshot
              </th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollmentRequests.map((request) => (
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]">
                      <DialogHeader>
                        <DialogTitle>
                          Payment Screenshot - {request.studentName}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Course: {request.courseTitle}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Amount: ${request.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Request Date: {request.createdAt}
                          </p>
                        </div>
                        <div className="border border-border rounded-lg overflow-hidden">
                          <img
                            src={
                              request.paymentScreenshotUrl || "/placeholder.svg"
                            }
                            alt="Payment screenshot"
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                  <div className="flex items-center space-x-1">
                    {request.status === "pending" && (
                      <>
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
                                <p className="text-sm text-muted-foreground mb-4">
                                  Amount: ${request.amount}
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
                              <Button className="bg-green-600 hover:bg-green-700">
                                Approve Enrollment
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

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
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button variant="destructive">
                                Reject Request
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                    {request.status === "approved" && (
                      <Badge
                        variant="default"
                        className="w-full justify-center"
                      >
                        Approved
                      </Badge>
                    )}
                    {request.status === "rejected" && (
                      <Badge
                        variant="destructive"
                        className="w-full justify-center"
                      >
                        Rejected
                      </Badge>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
