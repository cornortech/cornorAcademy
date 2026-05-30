"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/api/axios";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [isVerifying, setIsVerifying] = useState(!!token);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Auto-verify if token is in URL
  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      setError("");
      setIsVerifying(true);

      const response = await axiosInstance.post("/auth/verify-email", {
        token: verificationToken,
      });

      if (response.data.success) {
        setIsVerified(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(
        err.response?.data?.error || "Failed to verify email. Token may have expired."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError("Email not found. Please sign up again.");
      return;
    }

    setError("");
    setIsResending(true);

    try {
      // Call backend to resend verification email
      const response = await axiosInstance.post("/auth/resend-verification", {
        email,
      });

      if (response.data.success) {
        alert("✅ Verification email sent! Check your inbox.");
      }
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(
        err.response?.data?.error || "Failed to resend verification email."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground">
            {email
              ? `We've sent a verification link to ${email}.`
              : "Verify your email to activate your account."}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isVerified ? "Email Verified! ✅" : "Check Your Inbox"}
            </CardTitle>
            <CardDescription>
              {isVerified
                ? "Your email has been verified successfully. Redirecting to login..."
                : "Click the verification link in the email to activate your account."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {isVerifying && (
              <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>
                  Verifying your email address...
                </AlertDescription>
              </Alert>
            )}

            {isVerified && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Email verified! Redirecting to login...
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!isVerified && !isVerifying && (
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/login">Go to Login</Link>
                </Button>

                {email && (
                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    className="w-full"
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend Verification Email"
                    )}
                  </Button>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  Didn't receive the email? Check your spam folder or try
                  resending.
                </p>
              </div>
            )}

            {isVerified && (
              <Button asChild className="w-full">
                <Link href="/login">Go to Login</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
