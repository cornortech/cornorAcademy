import { Eye, CheckCircle, Clock, AlertCircle, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PaymentTableProps {
  payments: any[];
}

export function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-3 text-left font-medium">Student</th>
              <th className="px-6 py-3 text-left font-medium">Amount</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left font-medium">Date</th>
              <th className="px-6 py-3 text-left font-medium">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-border/50 last:border-b-0 hover:bg-accent/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={payment.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {payment.studentName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{payment.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {payment.studentEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold">${payment.amount}</td>
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
                            <p className="font-medium">{payment.studentName}</p>
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
                            <Badge variant="default">{payment.status}</Badge>
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
  );
}
