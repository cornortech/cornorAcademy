"use client";

import { useState } from "react";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { EnrollmentRequestList } from "./EnrollmentRequestList";

export function EnrollmentRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

      <EnrollmentRequestList />
    </div>
  );
}
