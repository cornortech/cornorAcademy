"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { TeacherProfessionalStep } from "./signup-steps/TeacherProfessionalStep";
import { AuthHeader } from "./AuthHeader";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/lib/api/auth.service";
import { SignupFormData, signupSchema } from "@/lib/validations/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const step1Fields = ["role", "name", "email", "password", "confirmPassword"] as const;
const step2Fields = [
  "phoneNumber",
  "gender",
  "dob",
  "address",
  "city",
  "district",
  "pincode",
  "country",
] as const;
const studentStep3Fields = [
  "educationInstitute",
  "qualification",
  "about",
  "agreeToTerms",
  "image",
] as const;

const teacherStep3Fields = [
  "bio",
  "expertise",
  "noOfYearsExperience",
  "agreeToTerms",
  "image",
] as const;

export function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "student",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: undefined,
      dob: "",
      address: "",
      city: "",
      district: "",
      pincode: "",
      country: "",
      about: "",
      educationInstitute: "",
      qualification: "",
      bio: "",
      expertise: "",
      noOfYearsExperience: "",
      agreeToTerms: false,
      image: undefined,
    },
    mode: "onSubmit",
  });

  const watchedRole = form.watch("role");
  const step3Fields = watchedRole === "teacher" ? teacherStep3Fields : studentStep3Fields;

  const handleNext = async () => {
    if (step === 1 && !watchedRole) {
      setSubmitError("Please select your role");
      return;
    }

    const fieldsToValidate = step === 1 ? [...step1Fields] : [...step2Fields];
    const isStepValid = await form.trigger(fieldsToValidate);

    if (isStepValid) {
      setSubmitError("");
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleback = () => {
    setSubmitError("");
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step < 3) {
        e.preventDefault();
        handleNext();
      }
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      // Create Firebase user
      const cred = await signup(data.email, data.password, data.name);
      if (!cred) throw new Error("Failed to create Firebase account");

      const email = data.email.toLowerCase();

      if (data.role === "student") {
        const registerPayload = {
          uid: cred.uid,
          name: data.name,
          email,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          image: "",
          dob: new Date(data.dob).toISOString(),
          address: data.address,
          city: data.city,
          district: data.district,
          pincode: data.pincode,
          country: data.country,
          about: data.about || "",
          educationInstitute: data.educationInstitute || "",
          qualification: data.qualification || "",
        };

        const registerResponse = await authService.registerStudent(registerPayload);
        const tokenParam = registerResponse.verificationToken ? `&token=${registerResponse.verificationToken}` : "";
        router.push(`/verify-email?email=${email}${tokenParam}`);
      } else {
        const registerPayload = {
          uid: cred.uid,
          name: data.name,
          email,
          image: "",
          bio: data.bio || "",
          noOfYearsExperience: data.noOfYearsExperience || "",
          expertise: data.expertise || "",
          dob: new Date(data.dob).toISOString(),
          gender: data.gender,
        };

        const registerResponse = await authService.registerTeacher(registerPayload);
        const tokenParam = registerResponse.verificationToken ? `&token=${registerResponse.verificationToken}` : "";
        router.push(`/verify-email?email=${email}${tokenParam}`);
      }
    } catch (error: any) {
      console.error("Signup Error:", error);

      let msg = "Failed to create account.";
      if (error.code === "auth/email-already-in-use")
        msg = "Email already in use.";
      else if (error.response?.data?.error) msg = error.response.data.error;

      setSubmitError(msg);
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
    watchedRole === "teacher" ? "Share your teaching experience" : "Share your qualifications and experience",
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
            className={`h-2 w-8 rounded-full ${step >= s ? "bg-primary" : "bg-muted"
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
          {submitError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onKeyDown={handleKeyDown}
              className="space-y-4"
            >
              {step === 1 && <AccountStep control={form.control} />}
              {step === 2 && <PersonalStep control={form.control} />}
              {step === 3 && (
                watchedRole === "teacher" ? (
                  <TeacherProfessionalStep control={form.control} />
                ) : (
                  <ProfessionalStep control={form.control} />
                )
              )}

              <div className="flex gap-3 mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleback}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                )}

                {step < 3 ? (
                  <Button type="button" className="flex-1" onClick={handleNext}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
