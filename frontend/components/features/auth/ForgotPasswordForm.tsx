"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/validations/auth";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthHeader } from "./AuthHeader";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      await sendPasswordResetEmail(auth, data.email, {
        url: `${window.location.origin}/login`,
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      let msg = "Failed to send reset email. Please try again.";

      if (err.code === "auth/too-many-requests") {
        msg = "Too many requests. Please try again later.";
      } else if (err.code === "auth/network-request-failed") {
        msg = "Network error. Check your internet connection.";
      }

      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Reset Password"
        description="We'll send you a link to reset your password"
      />

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Forgot Password?</CardTitle>
          <CardDescription>
            Enter the email address associated with your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-300">
                  If an account exists for{" "}
                  <strong>{form.getValues("email")}</strong>, you will receive a
                  password reset link shortly.
                </AlertDescription>
              </Alert>
              <Button className="w-full" asChild>
                <Link href="/login">Back to Login</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.doe@example.com"
                          type="email"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Reset Link
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </>
  );
}
