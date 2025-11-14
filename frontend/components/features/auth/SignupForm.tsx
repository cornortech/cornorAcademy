"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormData } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignupSuccess } from "./signup-steps/SignupSuccess";
import { AccountStep } from "./signup-steps/AccountStep";
import { PersonalStep } from "./signup-steps/PersonalStep";
import { ProfessionalStep } from "./signup-steps/ProfessionalStep";
import { AuthHeader } from "./AuthHeader";
import { useAuth } from "@/contexts/AuthContext";

const initialFormData: SignupFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  phoneNumber: "",
  gender: "",
  dob: "",
  address: "",
  city: "",
  district: "",
  pincode: "",
  country: "",
  about: "",
  educationInstitute: "",
  qualification: "",
  agreeToTerms: false,
};

export function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      setIsLoading(true);
      await signup(formData.email, formData.password, formData.name);
      setStep(4);
    } catch (error: any) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 4) {
    return <SignupSuccess onComplete={() => router.push("/login")} />;
  }

  const stepTitles = [
    "Account Credentials",
    "Personal Details",
    "Professional Background",
  ];
  const stepDescriptions = [
    "Set up your login and role",
    "Tell us more about yourself",
    "Share your qualifications and experience",
  ];

  return (
    <>
      <AuthHeader
        title="Create your account"
        description="Join thousands of learners worldwide"
      />

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8 gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 w-8 rounded-full ${
              step >= s ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl">{stepTitles[step - 1]}</CardTitle>
          <CardDescription>{stepDescriptions[step - 1]}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={
              step === 3
                ? handleSubmit
                : (e) => {
                    e.preventDefault();
                    handleNext();
                  }
            }
          >
            {step === 1 && (
              <AccountStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {step === 2 && (
              <PersonalStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {step === 3 && (
              <ProfessionalStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading
                  ? "Creating Account..."
                  : step === 3
                  ? "Create Account"
                  : "Continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
