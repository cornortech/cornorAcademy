import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PaymentSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export function PaymentSearchFilter({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: PaymentSearchFilterProps) {
  return (
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
        className="px-3 py-2 border border-border rounded-md text-sm bg-background"
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
  );
}
