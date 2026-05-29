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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { PasswordInput } from "./PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/api/axios";
import {DEMO_CREDENTIALS} from "@/lib/config";

const isDemoAccount = (email: string, password: string) =>
  Object.values(DEMO_CREDENTIALS).some(
    (demo) => demo.email === email && demo.password === password
  );

type VerificationState =
  | "none"
  | "not-verified"
  | "expired"
  | "account-pending";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationState, setVerificationState] =
    useState<VerificationState>("none");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [resendingEmail, setResendingEmail] = useState(false);
  const [accountStatus, setAccountStatus] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleResendVerification = async () => {
    setResendingEmail(true);
    try {
      const tempUser = await signInWithEmailAndPassword(
        auth,
        verificationEmail,
        getValues("password")
      );

      await sendEmailVerification(tempUser.user, {
        url: `${window.location.origin}/login`,
      });

      await auth.signOut();

      toast.success("Verification email sent! Check your inbox.");
      setVerificationState("not-verified");
    } catch (error: any) {
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again later.");
      } else {
        toast.error("Failed to resend email. Please try again.");
      }
    } finally {
      setResendingEmail(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setVerificationState("none");
    setAccountStatus("");

    try {
      // Step 1: Firebase authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Step 2: Check email verification
      await userCredential.user.reload();

      const demoAllowed = isDemoAccount(data.email, data.password);

      if (!userCredential.user.emailVerified && !demoAllowed) {
        await auth.signOut();
        setVerificationState("not-verified");
        setVerificationEmail(data.email);
        toast.error("Please verify your email before logging in.");
        return;
      }

      // Step 3: Backend login with Firebase token
      const token = await userCredential.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Step 4: Handle backend response
      const { status, redirectionUrl } = response.data;

      // Check account status
      if (status === "registered") {
        setVerificationState("account-pending");
        setAccountStatus("Your account is pending admin approval.");
        router.push("/legal-agreement");
        return;
      }

      if (status === "portalDeactivated") {
        toast.error("Your account has been deactivated. Contact admin.");
        router.push("/legal-agreement");
      }

      if (status === "rejected") {
        toast.error("Your registration was rejected. Contact admin.");
        router.push("/legal-agreement");
      }

      // Step 5: Successful login - Use backend's redirectionUrl
      toast.success("Login successful!");
      router.push(redirectionUrl);
    } catch (error: any) {
      console.error("Login error:", error);

      let errorMessage = "Failed to login. Please try again.";

      // Handle specific Firebase errors
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Check your connection.";
      } else if (error.response?.status === 404) {
        // Backend says user doesn't exist in database
        errorMessage = "Account not found. Please sign up first.";
      } else if (error.response?.status === 403) {
        // Account exists but has status issues
        const backendError = error.response.data.error;
        if (backendError.includes("not activated")) {
          setVerificationState("account-pending");
          setAccountStatus(backendError);
          router.push("/legal-agreement");
          return;
        }
        errorMessage = backendError;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationState === "not-verified" && (
          <Alert className="mb-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
            <Mail className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm">
              <p className="font-semibold mb-2">Email not verified</p>
              <p className="text-muted-foreground mb-3">
                Please check your inbox and click the verification link.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResendVerification}
                disabled={resendingEmail}
                className="w-full"
              >
                {resendingEmail ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {verificationState === "account-pending" && (
          <Alert className="mb-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-sm">
              <p className="font-semibold mb-2">Account not activated, yet.</p>
              <p className="text-muted-foreground mb-2">
                {accountStatus || "Your account is awaiting admin approval."}
              </p>
              <p className="text-xs text-muted-foreground">
                You'll be redirected to agreement signing page to activate your
                portal.
              </p>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
