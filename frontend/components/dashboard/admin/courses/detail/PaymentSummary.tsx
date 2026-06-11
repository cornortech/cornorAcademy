import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentSummaryProps {
  coursePrice: number;
  completedPayments: number;
  totalRevenue: number;
  totalStudents: number;
  pendingAmount: number;
}

export function PaymentSummary({
  coursePrice,
  completedPayments,
  totalRevenue,
  totalStudents,
  pendingAmount,
}: PaymentSummaryProps) {
  return (
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
                  <span className="font-semibold">{item.count} students</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{
                      width: `${(item.count / totalStudents) * 100}%`,
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
              <span className="text-muted-foreground">Course Price</span>
              <span className="font-medium">Rs {coursePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completed Payments</span>
              <span className="font-medium">{completedPayments}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total Revenue</span>
              <span className="text-lg">Rs {totalRevenue}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
