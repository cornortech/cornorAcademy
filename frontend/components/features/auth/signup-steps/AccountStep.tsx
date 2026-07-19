"use client";
import { Input } from "@/components/ui/input";

import { PasswordInput } from "../PasswordInput";
import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, CheckCircle2, XCircle } from "lucide-react";
import { Control, useWatch } from "react-hook-form";
import { SignupFormData } from "@/lib/validations/auth";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface StepProps {
  control: Control<SignupFormData>;
}

export const AccountStep = ({ control }: StepProps) => {
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
  });

  useEffect(() => {
    const pass = password || "";
    setPasswordStrength({
      minLength: pass.length >= 8,
      hasUppercase: /[A-Z]/.test(pass),
      hasLowercase: /[a-z]/.test(pass),
      hasNumber: /\d/.test(pass),
    });
  }, [password]);
  return (
    <div className="space-y-3">
      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem className="pb-1">
            <FormLabel className="text-base font-semibold">
              I want to join as
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => field.onChange("student")}
                  className={`flex items-center gap-2 rounded-lg border-2 p-3 transition-all ${field.value === "student"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                    }`}
                >
                  <BookOpen className={`h-5 w-5 shrink-0 ${field.value === "student" ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-left">
                    <span className={`text-sm font-medium block ${field.value === "student" ? "text-primary" : "text-foreground"}`}>
                      Student
                    </span>
                    <span className="text-xs text-muted-foreground">
                      I want to learn
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange("teacher")}
                  className={`flex items-center gap-2 rounded-lg border-2 p-3 transition-all ${field.value === "teacher"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                    }`}
                >
                  <GraduationCap className={`h-5 w-5 shrink-0 ${field.value === "teacher" ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-left">
                    <span className={`text-sm font-medium block ${field.value === "teacher" ? "text-primary" : "text-foreground"}`}>
                      Teacher
                    </span>
                    <span className="text-xs text-muted-foreground">
                      I want to teach
                    </span>
                  </div>
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Full Name <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Email <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Password <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <PasswordInput
                placeholder="Create a strong password"
                {...field}
              />
            </FormControl>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <PasswordRequirement
                  met={passwordStrength.minLength}
                  text="8+ characters"
                />
                <PasswordRequirement
                  met={passwordStrength.hasUppercase}
                  text="Uppercase"
                />
                <PasswordRequirement
                  met={passwordStrength.hasLowercase}
                  text="Lowercase"
                />
                <PasswordRequirement
                  met={passwordStrength.hasNumber}
                  text="Number"
                />
              </div>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Confirm Password <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <PasswordInput placeholder="Confirm your password" {...field} />
            </FormControl>
            {confirmPassword && password === confirmPassword && (
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <CheckCircle2 className="h-3 w-3" />
                Passwords match
              </p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      ) : (
        <XCircle className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={met ? "text-green-600" : "text-muted-foreground"}>
        {text}
      </span>
    </div>
  );
}
