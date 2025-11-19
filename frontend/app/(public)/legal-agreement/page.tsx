"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookOpen, Check, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Canvas } from "@/components/signature-canvas";
import AgreementContent from "@/components/features/legal/agreement-content";
import { useAuth } from "@/contexts/AuthContext";
import { useUploadImage } from "@/hooks/use-media";
import axiosInstance from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/lib/api/auth.service";
import { UserRole } from "@/types";

const dataURLtoFile = (dataURL: string, filename: string): File => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};

export default function LegalAgreementPage() {
  const {
    user,
    userData,
    userRole,
    userStatus,
    updateUserStatus,
    refreshUser,
  } = useAuth();
  const { uploadImage } = useUploadImage();
  const router = useRouter();

  const [signatureURL, setSignatureURL] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [agreedToRefund, setAgreedToRefund] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [signaturePad, setSignaturePad] = useState<any>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isAgreementSigned, setIsAgreementSigned] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    setStudentName(user.displayName || "");
    setStudentEmail(user.email || "");

    if (userStatus === "portalActivated") {
      redirectToDashboard();
    }
  }, [user, userStatus]);

  const redirectToDashboard = () => {
    if (!userRole) return;

    switch (userRole) {
      case "student":
        router.push("/student");
        break;
      case "teacher":
        router.push("/teacher");
        break;
      case "admin":
        router.push("/admin");
        break;
    }
  };

  const handleSignature = useCallback((canvas: any) => {
    setSignaturePad(canvas);
  }, []);

  const handleSign = () => {
    if (signaturePad && !signaturePad.isEmpty()) {
      setIsSigned(true);
    }
  };

  const handleClearSignature = () => {
    if (signaturePad) {
      signaturePad.clear();
      setIsSigned(false);
    }
  };

  const handleCompleteAgreement = async () => {
    if (
      agreedToTerms &&
      agreedToPolicy &&
      agreedToRefund &&
      isSigned &&
      studentName &&
      studentEmail
    ) {
      if (!signaturePad) return;

      const dataUrl = signaturePad.toDataURL();
      const file = dataURLtoFile(dataUrl, `signature_${Date.now()}.png`);

      const uploadResult = await uploadImage(file);

      if (uploadResult.url) {
        setSignatureURL(uploadResult.url);

        try {
          const res = await authService.uploadLegalAgreement(uploadResult.url);
          const profileRes = await authService.getUserProfile();
          profileRes.role;
          if (res.data.success) {
            updateUserStatus("portalActivated");
            await refreshUser();
            toast.success(res.data.message);
            // router.push(`/${role}`);
            setIsAgreementSigned(true);
          }
        } catch (err) {
          console.error("Error submitting agreement:", err);
        }

        setIsAgreementSigned(true);
      }
    }
  };

  if (isAgreementSigned) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Cornor Academy</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Agreement Signed Successfully!
            </h1>
            <p className="text-muted-foreground mb-6">
              Your legal agreement has been signed and recorded.
            </p>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 text-sm">
              <p className="text-green-800 dark:text-green-200">
                You are now authorized to proceed with course enrollment. This
                agreement establishes the terms between you and Cornor Academy
                for your course participation.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href={`/${userRole}`}>Proceed to Dashboard</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Cornor Academy</span>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Course Enrollment Agreement
            </h1>
            <p className="text-muted-foreground">
              Please read and sign this legal agreement before proceeding with
              course enrollment
            </p>
          </div>

          <div className="grid gap-8">
            {/* Legal Agreement Content */}
            <Card className="border-border/50 bg-card/50 backdrop-blur overflow-auto">
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>
                  Legal agreement between Cornor Academy and Student regarding
                  course enrollment and participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AgreementContent />
              </CardContent>
            </Card>

            {/* Student Information */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      defaultValue={user?.displayName || ""}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      defaultValue={user?.email || ""}
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Digital Signature */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Digital Signature</CardTitle>
                <CardDescription>
                  Sign below to confirm your agreement to the terms and
                  conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/20">
                  <Canvas onCanvasReady={handleSignature} />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSign}
                    disabled={isSigned}
                    variant="default"
                    className="flex-1"
                  >
                    Sign Here
                  </Button>
                  <Button
                    onClick={handleClearSignature}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Clear
                  </Button>
                </div>
                {isSigned && (
                  <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Signature captured successfully
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Agreement Checkboxes */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) =>
                        setAgreedToTerms(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I have read and agree to the Terms & Conditions outlined
                      above *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="policy"
                      checked={agreedToPolicy}
                      onCheckedChange={(checked) =>
                        setAgreedToPolicy(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="policy"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I understand the refund policy and early withdrawal
                      consequences *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="legal"
                      checked={agreedToRefund}
                      onCheckedChange={(checked) =>
                        setAgreedToRefund(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="legal"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I acknowledge that breach of this agreement may result in
                      legal action and penalties *
                    </Label>
                  </div>
                </div>

                {(!agreedToTerms ||
                  !agreedToPolicy ||
                  !agreedToRefund ||
                  !isSigned) && (
                  <div className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-yellow-700 dark:text-yellow-200">
                      Please complete all fields and agree to all terms before
                      signing
                    </span>
                  </div>
                )}

                <Button
                  onClick={handleCompleteAgreement}
                  disabled={
                    !agreedToTerms ||
                    !agreedToPolicy ||
                    !agreedToRefund ||
                    !isSigned ||
                    !studentName ||
                    !studentEmail
                  }
                  className="w-full h-11"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Sign & Accept Agreement
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
