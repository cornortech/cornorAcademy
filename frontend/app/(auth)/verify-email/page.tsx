"use client";

import { useState } from "react";
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
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "youremail";
  const router = useRouter();

  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleResendEmail = async () => {
    setError("");
    setIsSending(true);

    try {
      if (!auth.currentUser) {
        setError("Cannot resend email. Please log in first.");
        return;
      }

      await sendEmailVerification(auth.currentUser);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to resend verification email.");
    } finally {
      setIsSending(false);
    }
  };

  const handleGoToLogin = () => {
    router.push("/login");
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
            We've sent a verification link to <strong>{email}</strong>
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
            {emailSent && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Verification email sent! Check your inbox.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button onClick={handleGoToLogin} className="w-full">
                I&apos;ve Verified My Email
              </Button>

              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full"
                disabled={isSending || emailSent}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </Button>

              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Back to Login
                </Link>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t">
              <p className="font-semibold">Didn't receive the email?</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Check your spam or junk folder</li>
                <li>Make sure the email address is correct</li>
                <li>Wait a few minutes and try resending</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
