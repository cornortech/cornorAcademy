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
import { Award, Search } from "lucide-react";
import PublicHeader from "@/components/shared/public-header";
import CertificateVerificationForm from "@/components/features/certificate/certificate-verification-form";
import { CertificateDetails } from "@/components/features/certificate/certificate-details";
import { VerificationError } from "@/components/features/certificate/verification-error";
import { Certificate } from "@/types";
import { mockCertificates } from "@/lib/data";

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    certificate?: Certificate;
    error?: string;
  } | null>(null);

  const handleVerification = async () => {
    setIsVerifying(true);
    setVerificationResult(null);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const trimmedId = certificateId.trim().toUpperCase();

    if (!trimmedId.match(/^CA-\d{4}-[A-Z]{2}-\d{6}$/)) {
      setVerificationResult({
        success: false,
        error:
          "Invalid certificate ID format. Please use format: CA-YYYY-CC-NNNNNN",
      });
      setIsVerifying(false);
      return;
    }

    const certificate = mockCertificates[trimmedId];

    if (certificate) {
      setVerificationResult({
        success: true,
        certificate,
      });
    } else {
      setVerificationResult({
        success: false,
        error: "Certificate not found. Please check the ID and try again.",
      });
    }

    setIsVerifying(false);
  };

  const handleDownloadCertificate = () => {
    // In a real app, this would generate and download the certificate PDF
    alert("Certificate download would start here");
  };

  const handleShareCertificate = () => {
    if (verificationResult?.certificate) {
      navigator.clipboard.writeText(
        `https://Cornoracademy.com/verify-certificate?id=${verificationResult.certificate.id}`
      );
      alert("Certificate verification link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <PublicHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance mb-4">
              Certificate Verification
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Verify the authenticity of Cornor Academy certificates and view
              detailed information about the achievement.
            </p>
          </div>

          {/* Verification Form */}
          <Card className="border-border/50 bg-card/50 backdrop-blur mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Verify Certificate
              </CardTitle>
              <CardDescription>
                Enter the certificate ID to verify its authenticity and view
                certificate details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CertificateVerificationForm
                onVerify={handleVerification}
                isVerifying={isVerifying}
              />
            </CardContent>
          </Card>

          {/* Verification Result */}
          {verificationResult &&
            (verificationResult.success && verificationResult.certificate ? (
              <CertificateDetails
                certificate={verificationResult.certificate}
                onDownload={handleDownloadCertificate}
                onShare={handleShareCertificate}
              />
            ) : (
              <VerificationError
                error={verificationResult.error || ""}
                onTryAgain={() => setVerificationResult(null)}
              />
            ))}

          {/* Sample Certificates for Testing */}
          <Card className="border-border/50 bg-card/50 backdrop-blur mt-8">
            <CardHeader>
              <CardTitle>Sample Certificates for Testing</CardTitle>
              <CardDescription>
                Use these sample certificate IDs to test the verification
                system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.values(mockCertificates).map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 border border-border rounded-lg"
                  >
                    <h4 className="font-medium mb-2">{cert.courseName}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Student: {cert.studentName}
                    </p>
                    <code className="text-xs font-mono bg-muted px-2 py-1 rounded block mb-2">
                      {cert.id}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCertificateId(cert.id);
                        handleVerification();
                      }}
                      className="w-full"
                    >
                      Test This Certificate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
