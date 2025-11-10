"use client";
import {
  Building,
  Check,
  CreditCard,
  Link,
  Shield,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { Separator } from "@radix-ui/react-select";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import { getCourseData } from "@/data/mock/GetCourseData";

const PaymentForm = ({ params }: { params: { courseId: string } }) => {
  const course = getCourseData(params.courseId);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);
  const handleEnrollment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setEnrollmentComplete(true);
  };

  if (enrollmentComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6 text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Enrollment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Welcome to {course.title}! You'll receive an email with your
              course access details shortly.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/dashboard/student">Go to Dashboard</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/">Back to Home</Link>
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
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Choose your payment method and complete your enrollment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-4 border border-border/50 rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  Credit/Debit Card
                </Label>
                <div className="flex space-x-1">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                    MC
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-4 border border-border/50 rounded-lg">
                <RadioGroupItem value="paypal" id="paypal" />
                <Wallet className="h-5 w-5" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  PayPal
                </Label>
                <div className="text-blue-600 font-semibold text-sm">
                  PayPal
                </div>
              </div>

              <div className="flex items-center space-x-2 p-4 border border-border/50 rounded-lg">
                <RadioGroupItem value="bank" id="bank" />
                <Building className="h-5 w-5" />
                <Label htmlFor="bank" className="flex-1 cursor-pointer">
                  Bank Transfer
                </Label>
                <div className="text-sm text-muted-foreground">
                  2-3 business days
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    className="font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholder">Cardholder Name</Label>
                  <Input id="cardholder" placeholder="John Smith" />
                </div>
              </div>
            </div>
          )}

          {/* Billing Information */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Billing Information
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Smith" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.smith@email.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main Street" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="New York" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="10001" />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <h4 className="font-semibold">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Course Price</span>
                <span>${course.originalPrice}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount (25%)</span>
                <span>-${course.originalPrice - course.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$0</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${course.price}</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          {/* Security Notice */}
          <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Secure Payment
              </p>
              <p className="text-blue-700 dark:text-blue-200">
                Your payment information is encrypted and secure. We never store
                your card details.
              </p>
            </div>
          </div>

          {/* Enroll Button */}
          <Button
            onClick={handleEnrollment}
            disabled={isProcessing}
            className="w-full h-12 text-lg"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing Payment...
              </>
            ) : (
              <>Complete Enrollment - ${course.price}</>
            )}
          </Button>

          {/* Money Back Guarantee */}
          <div className="text-center text-sm text-muted-foreground">
            <p>30-day money-back guarantee • Cancel anytime</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;
