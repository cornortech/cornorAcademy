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
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { PasswordInput } from "./PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
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

interface LoginError {
  code?: string;
  message?: string;
  response?: {
    status?: number;
    data?: {
      error?: string;
    };
  };
}

type VerificationState =
  | "none"
  | "not-verified"
  | "expired";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationState, setVerificationState] =
    useState<VerificationState>("none");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [resendingEmail, setResendingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
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
    } catch (error: unknown) {
      const loginError = error as LoginError;
      if (loginError.code === "auth/too-many-requests") {
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

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await userCredential.user.reload();

      const demoAllowed = isDemoAccount(data.email, data.password);

      if (!userCredential.user.emailVerified && !demoAllowed) {
        await auth.signOut();
        setVerificationState("not-verified");
        setVerificationEmail(data.email);
        toast.error("Please verify your email before logging in.");
        return;
      }

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

      const { status, redirectionUrl } = response.data;

      if (status === "portalDeactivated") {
        toast.error("Your account has been deactivated. Contact admin.");
        return;
      }

      if (status === "rejected") {
        toast.error("Your registration was rejected. Contact admin.");
        return;
      }

      toast.success("Login successful!");
      router.push(redirectionUrl);
    } catch (error: unknown) {
      console.error("Login error:", error);

      const loginError = error as LoginError;

      if (loginError.code === "auth/user-not-found") {
        setError("email", { message: "Invalid email address." });
      } else if (
        loginError.code === "auth/wrong-password" ||
        loginError.code === "auth/invalid-credential"
      ) {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, data.email);
          if (methods.length === 0) {
            setError("email", { message: "User not found." });
          } else {
            setError("password", { message: "Incorrect password." });
          }
        } catch {
          setError("password", { message: "Incorrect password." });
        }
      } else if (loginError.code === "auth/too-many-requests") {
        toast.error("Too many failed attempts. Please try again later.");
      } else if (loginError.code === "auth/network-request-failed") {
        toast.error("Network error. Check your connection.");
      } else if (loginError.response?.status === 404) {
        toast.error("Account not found. Please sign up first.");
      } else if (loginError.response?.status === 403) {
        toast.error(loginError.response.data?.error || "Failed to login. Please try again.");
      } else if (loginError.response?.data?.error) {
        toast.error(loginError.response.data.error);
      } else {
        toast.error("Failed to login. Please try again.");
      }
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
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
