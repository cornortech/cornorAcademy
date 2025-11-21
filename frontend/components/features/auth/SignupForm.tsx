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
import { AccountStep } from "./signup-steps/AccountStep";
import { PersonalStep } from "./signup-steps/PersonalStep";
import { ProfessionalStep } from "./signup-steps/ProfessionalStep";
import { AuthHeader } from "./AuthHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useUploadImage } from "@/hooks/use-media";
import { authService } from "@/lib/api/auth.service";
import {
  accountStepSchema,
  personalStepSchema,
  professionalStepSchema,
} from "@/lib/validations/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

interface UploadResult {
  progress: number;
  url?: string;
  isCompleted: boolean;
}

const initialFormData: SignupFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "student",
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
  image: null,
};

export function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const { uploadImage } = useUploadImage();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Clear validation errors for updated fields
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(data).forEach((key) => delete newErrors[key]);
      return newErrors;
    });
    setError("");
  };

  const validateStep = (currentStep: number): boolean => {
    console.log(`validation step starts, current step: ${currentStep}`);
    setError("");
    setValidationErrors({});

    try {
      if (currentStep === 1) {
        accountStepSchema.parse({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
      } else if (currentStep === 2) {
        personalStepSchema.parse({
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          dob: formData.dob,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          pincode: formData.pincode,
          country: formData.country,
        });
      } else if (currentStep === 3) {
        professionalStepSchema.parse({
          educationInstitute: formData.educationInstitute,
          qualification: formData.qualification,
          about: formData.about,
          agreeToTerms: formData.agreeToTerms,
        });
      }
      return true;
    } catch (err: any) {
      console.log("Error in step validation", err);
      if (err.errors) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error: any) => {
          const field = error.path.join(".");
          errors[field] = error.message;
        });
        setValidationErrors(errors);
        setError(err.errors[0]?.message || "Please fix the errors below");
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setError("");
    setValidationErrors({});
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Step 1: Create Firebase user
      const cred = await signup(
        formData.email,
        formData.password,
        formData.name
        // formData.role as UserRole
      );

      if (!cred) {
        throw new Error("Failed to create Firebase account");
      }

      // Step 2: Upload image if provided
      let uploadedImageUrl = "";
      if (formData.image) {
        console.log("Step 2: Uploading profile image...");
        const fileUploadRes = await uploadImage(formData.image as File);
        if (fileUploadRes.isCompleted && fileUploadRes.url) {
          uploadedImageUrl = fileUploadRes.url;
        } else {
          console.warn("⚠ Image upload incomplete or failed");
        }
      } else {
        console.log("Step 2: No image to upload, skipping...");
      }

      const registerPayload = {
        uid: cred.uid,
        name: formData.name,
        email: formData.email.toLowerCase(),
        phoneNumber: formData.phoneNumber,
        gender: formData.gender as "male" | "female" | "other",
        image: uploadedImageUrl || "",
        dob: new Date(formData.dob).toISOString(),
        address: formData.address,
        city: formData.city,
        district: formData.district,
        pincode: formData.pincode,
        country: formData.country,
        about: formData.about || "",
        educationInstitute: formData.educationInstitute,
        qualification: formData.qualification,
      };

      const response = await authService.registerStudent(registerPayload);

      // Step 3: Redirect to email verification
      router.push(`/verify-email?email=${formData.email}`);
    } catch (error: any) {
      console.error("❌ Signup failed:", error);

      let errorMessage = "Failed to create account. Please try again.";

      // Handle different error types
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Handle specific errors
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection";
      }

      setError(errorMessage);

      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

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
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
                errors={validationErrors}
              />
            )}
            {step === 2 && (
              <PersonalStep
                formData={formData}
                updateFormData={updateFormData}
                errors={validationErrors}
              />
            )}
            {step === 3 && (
              <ProfessionalStep
                formData={formData}
                updateFormData={updateFormData}
                errors={validationErrors}
              />
            )}

            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {step === 3 ? "Creating Account..." : "Processing..."}
                  </>
                ) : step === 3 ? (
                  "Create Account"
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
