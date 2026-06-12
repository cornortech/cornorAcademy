"use client";

import { useState, useEffect } from "react";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { EnrollmentRequestList } from "./EnrollmentRequestList";
import { EnrolledCourseItem } from "@/types";

interface Props {
  enrollments?: EnrolledCourseItem[];
}

export function EnrollmentRequests({ enrollments: propEnrollments }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    if (propEnrollments && propEnrollments.length > 0) {
      setEnrollments(propEnrollments.map((e) => ({
        id: e.id,
        studentName: e.student?.name || "Unknown",
        studentEmail: e.student?.email || "",
        courseTitle: e.course?.title || "",
        courseId: e.course?.id || "",
        studentId: e.student?.id || "",
        status: e.status === "approved" ? "approved" : e.status === "rejected" ? "rejected" : "pending",
        createdAt: new Date(e.course?.createdAt || Date.now()).toLocaleDateString(),
      })));
    }
  }, [propEnrollments]);

  const filteredEnrollments = enrollments.filter((e) => {
    const matchesSearch =
      !searchQuery ||
      e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || e.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Course Enrollment Requests</h3>
          <p className="text-muted-foreground">
            Review and manage pending course enrollment requests
          </p>
        </div>
      </div>

      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchPlaceholder="Search by student name or course..."
        filterOptions={[
          { value: "all", label: "All Status" },
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ]}
      />

      <EnrollmentRequestList enrollments={filteredEnrollments} />
    </div>
  );
}
