"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupFormData, UserRole } from "@/types";
import { PasswordInput } from "../PasswordInput";
import { useEffect, useState } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  errors?: Record<string, string>;
}

export const AccountStep = ({
  formData,
  updateFormData,
  errors,
}: StepProps) => {
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
  });

  useEffect(() => {
    const password = formData.password;
    setPasswordStrength({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
    });
  }, [formData.password]);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Full Name <span className="text-destructive">*</span>
        </Label>{" "}
        <Input
          id="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className={errors?.name ? "border-destructive" : ""}
        />
        {errors?.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className={errors?.email ? "border-destructive" : ""}
        />
        {errors?.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Password <span className="text-destructive">*</span>
        </Label>
        <PasswordInput
          id="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          className={errors?.password ? "border-destructive" : ""}
        />

        {/* Password Requirements */}
        <div className="mt-3 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Password must contain:
          </p>
          <div className="space-y-1">
            <PasswordRequirement
              met={passwordStrength.minLength}
              text="At least 8 characters"
            />
            <PasswordRequirement
              met={passwordStrength.hasUppercase}
              text="One uppercase letter"
            />
            <PasswordRequirement
              met={passwordStrength.hasLowercase}
              text="One lowercase letter"
            />
            <PasswordRequirement
              met={passwordStrength.hasNumber}
              text="One number"
            />
          </div>
        </div>

        {errors?.password && (
          <p className="text-sm text-destructive mt-2">{errors.password}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password <span className="text-destructive">*</span>
        </Label>
        <PasswordInput
          id="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
          className={errors?.confirmPassword ? "border-destructive" : ""}
        />
        {errors?.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
        )}
        {formData.confirmPassword &&
          formData.password === formData.confirmPassword && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Passwords match
            </p>
          )}
      </div>
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
