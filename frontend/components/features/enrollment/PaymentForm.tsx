"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/api/axios";
import type { Course } from "@/types";

interface PaymentFormProps {
  course: Course;
  studentId: string;
}

export function PaymentForm({ course, studentId }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const isEnrolled = searchParams.get("enrolled") === "success";

  const handleKhaltiPayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const res = await axiosInstance.post("/payment/khalti/initiate", {
        courseId: course.id,
      });

      if (res.data.success && res.data.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        setError(res.data?.error || "Failed to initiate payment");
        setIsProcessing(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Failed to initiate payment");
      setIsProcessing(false);
    }
  };

  if (isEnrolled) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6 text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Enrollment Request Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your payment has been received. Your enrollment request is now pending approval
              by the course instructor. You will be notified once it is approved.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href={`/courses/${course.id}`}>Go to Course</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/student">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>
            Complete your enrollment using Khalti
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <h4 className="font-semibold">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Course Price</span>
                <span>Rs {course.price}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs {course.price}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Secure Payment
              </p>
              <p className="text-blue-700 dark:text-blue-200">
                You will be redirected to Khalti&apos;s secure payment page to
                complete your transaction.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <Button
            onClick={handleKhaltiPayment}
            disabled={isProcessing}
            className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Redirecting to Khalti...
              </>
            ) : (
              `Pay Rs ${course.price} with Khalti`
            )}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <p>30-day money-back guarantee &bull; Cancel anytime</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
