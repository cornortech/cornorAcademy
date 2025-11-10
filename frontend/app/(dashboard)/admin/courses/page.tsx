"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DollarSign,
  Users,
  TrendingUp,
  ArrowLeft,
  Eye,
  Download,
  Filter,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminCourseDetailPage() {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock course data
  const course = {
    id: params.courseId,
    title: "Web Development Fundamentals",
    instructor: "Dr. Sarah Johnson",
    price: 299,
    totalStudents: 67,
    totalRevenue: 20033,
    completionRate: 85,
    rating: 4.8,
    status: "active",
  };

  // Mock payment data for students
  const studentPayments = [
    {
      id: 1,
      studentName: "John Smith",
      studentEmail: "john.smith@email.com",
      amount: 299,
      status: "completed",
      paymentMethod: "Credit Card",
      date: "2024-01-15",
      transactionId: "TXN001",
      avatar: "/student-avatar.png",
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      studentEmail: "sarah.wilson@email.com",
      amount: 224.25,
      status: "partial",
      paymentMethod: "PayPal",
      date: "2024-01-14",
      transactionId: "TXN002",
      avatar: "/student-avatar-2.png",
    },
    {
      id: 3,
      studentName: "Michael Brown",
      studentEmail: "michael.brown@email.com",
      amount: 299,
      status: "completed",
      paymentMethod: "Bank Transfer",
      date: "2024-01-10",
      transactionId: "TXN003",
      avatar: "/student-avatar-3.png",
    },
    {
      id: 4,
      studentName: "Emma Davis",
      studentEmail: "emma.davis@email.com",
      amount: 0,
      status: "pending",
      paymentMethod: "-",
      date: "-",
      transactionId: "-",
      avatar: "/student-avatar-4.png",
    },
    {
      id: 5,
      studentName: "Alex Johnson",
      studentEmail: "alex.johnson@email.com",
      amount: 299,
      status: "completed",
      paymentMethod: "Credit Card",
      date: "2024-01-08",
      transactionId: "TXN004",
      avatar: "/student-avatar-5.png",
    },
  ];

  // Filter payments
  const filteredPayments = studentPayments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const completedPayments = studentPayments.filter(
    (p) => p.status === "completed"
  ).length;
  const totalAmountReceived = studentPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = studentPayments.filter(
    (p) => p.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/dashboard/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground">
            Instructor: {course.instructor}
          </p>
        </div>

        {/* Payment Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${course.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                From {completedPayments} completed payments
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{course.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                {pendingAmount} pending enrollment
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Math.round(course.totalRevenue / completedPayments)}
              </div>
              <p className="text-xs text-muted-foreground">
                Per completed enrollment
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Collection Rate
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((completedPayments / course.totalStudents) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Payment completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Payment Details */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payments">Student Payments</TabsTrigger>
            <TabsTrigger value="summary">Payment Summary</TabsTrigger>
          </TabsList>

          {/* Student Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <p className="text-muted-foreground">
                  Track student payments and enrollment status
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name or email..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Payments Table */}
            <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="px-6 py-3 text-left font-medium">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Payment Method
                      </th>
                      <th className="px-6 py-3 text-left font-medium">Date</th>
                      <th className="px-6 py-3 text-left font-medium">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-border/50 last:border-b-0 hover:bg-accent/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={payment.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {payment.studentName
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {payment.studentName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {payment.studentEmail}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          ${payment.amount}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              payment.status === "completed"
                                ? "default"
                                : payment.status === "partial"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {payment.status === "completed" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {payment.status === "pending" && (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {payment.status === "partial" && (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {payment.paymentMethod}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">
                          {payment.transactionId}
                        </td>
                        <td className="px-6 py-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Payment Details</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Student Name
                                    </p>
                                    <p className="font-medium">
                                      {payment.studentName}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Email
                                    </p>
                                    <p className="font-medium">
                                      {payment.studentEmail}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Amount
                                    </p>
                                    <p className="font-medium text-lg">
                                      ${payment.amount}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Status
                                    </p>
                                    <Badge variant="default">
                                      {payment.status}
                                    </Badge>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm text-muted-foreground">
                                      Payment Method
                                    </p>
                                    <p className="font-medium">
                                      {payment.paymentMethod}
                                    </p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm text-muted-foreground">
                                      Transaction ID
                                    </p>
                                    <p className="font-mono text-sm">
                                      {payment.transactionId}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Close</Button>
                                <Button>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Receipt
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Payment Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Status Distribution */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-base">
                    Payment Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        label: "Completed",
                        count: completedPayments,
                        color: "bg-green-500",
                      },
                      {
                        label: "Pending",
                        count: pendingAmount,
                        color: "bg-yellow-500",
                      },
                      { label: "Partial", count: 1, color: "bg-blue-500" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span className="font-semibold">
                            {item.count} students
                          </span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color}`}
                            style={{
                              width: `${
                                (item.count / course.totalStudents) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-base">Revenue Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Course Price
                      </span>
                      <span className="font-medium">${course.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Completed Payments
                      </span>
                      <span className="font-medium">{completedPayments}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total Revenue</span>
                      <span className="text-lg">${totalAmountReceived}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
