"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { sendEmailVerification } from "firebase/auth";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (cooldown > 0) {
      intervalRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cooldown]);

  const handleResendEmail = async () => {
    if (!auth.currentUser) {
      setError("Session expired. Please sign up again.");
      return;
    }

    setError("");
    setIsResending(true);

    try {
      await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false,
      });
      setCooldown(60);
      alert("Verification email sent! Check your inbox.");
    } catch (err: any) {
      if (err.code === "auth/too-many-requests") {
        setError("Please wait before requesting another email.");
        setCooldown(60);
      } else {
        setError(err.message || "Failed to resend verification email.");
      }
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
            <CardTitle>Check Your Inbox</CardTitle>
            <CardDescription>
              Click the verification link in the email to activate your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">Go to Login</Link>
              </Button>

              {email && (
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full"
                  disabled={isResending || cooldown > 0}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : cooldown > 0 ? (
                    `Resend in ${cooldown}s`
                  ) : (
                    "Resend Verification Email"
                  )}
                </Button>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Didn&apos;t receive the email? Check your spam folder or try
                resending.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center p-4"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
