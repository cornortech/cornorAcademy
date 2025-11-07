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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Award,
  Shield,
  CheckCircle,
  Search,
  Download,
  Share,
  Calendar,
  User,
  GraduationCap,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface Certificate {
  id: string;
  studentName: string;
  courseName: string;
  instructor: string;
  completionDate: string;
  issueDate: string;
  grade: string;
  creditsEarned: number;
  status: "valid" | "invalid";
  skills: string[];
}

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState<Certificate | null>(null);
  const [error, setError] = useState("");

  // Mock certificate data
  const mockCertificates: Record<string, Certificate> = {
    "CA-2024-WD-001234": {
      id: "CA-2024-WD-001234",
      studentName: "John Doe",
      courseName: "Web Development Fundamentals",
      instructor: "Sarah Johnson",
      completionDate: "March 15, 2024",
      issueDate: "March 16, 2024",
      grade: "A+",
      creditsEarned: 12,
      status: "valid",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"],
    },
    "CA-2024-DS-005678": {
      id: "CA-2024-DS-005678",
      studentName: "Jane Smith",
      courseName: "Data Science & Analytics",
      instructor: "Dr. Michael Chen",
      completionDate: "February 28, 2024",
      issueDate: "March 1, 2024",
      grade: "A",
      creditsEarned: 16,
      status: "valid",
      skills: [
        "Python",
        "Pandas",
        "Machine Learning",
        "Data Visualization",
        "Statistics",
      ],
    },
    "CA-2023-DM-009876": {
      id: "CA-2023-DM-009876",
      studentName: "Mike Johnson",
      courseName: "Digital Marketing Mastery",
      instructor: "Emma Rodriguez",
      completionDate: "December 10, 2023",
      issueDate: "December 11, 2023",
      grade: "B+",
      creditsEarned: 10,
      status: "valid",
      skills: [
        "SEO",
        "Social Media Marketing",
        "Google Analytics",
        "Content Marketing",
        "PPC",
      ],
    },
  };

  const handleVerification = async () => {
    setIsVerifying(true);
    setError("");
    setVerificationResult(null);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const trimmedId = certificateId.trim().toUpperCase();

    if (!trimmedId) {
      setError("Please enter a certificate ID");
      setIsVerifying(false);
      return;
    }

    if (!trimmedId.match(/^CA-\d{4}-[A-Z]{2}-\d{6}$/)) {
      setError(
        "Invalid certificate ID format. Please use format: CA-YYYY-CC-NNNNNN"
      );
      setIsVerifying(false);
      return;
    }

    const certificate = mockCertificates[trimmedId];

    if (certificate) {
      setVerificationResult(certificate);
    } else {
      setError("Certificate not found. Please check the ID and try again.");
    }

    setIsVerifying(false);
  };

  const handleDownloadCertificate = () => {
    // In a real app, this would generate and download the certificate PDF
    alert("Certificate download would start here");
  };

  const handleShareCertificate = () => {
    if (!verificationResult) return;
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(
      `https://corneracademy.com/verify-certificate?id=${verificationResult.id}`
    );
    alert("Certificate verification link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      {/* <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  Corner Academy
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav> */}

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
              Verify the authenticity of Corner Academy certificates and view
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
              <div className="space-y-2">
                <Label htmlFor="certificate-id">Certificate ID</Label>
                <div className="flex space-x-2">
                  <Input
                    id="certificate-id"
                    type="text"
                    placeholder="Enter certificate ID (e.g., CA-2024-WD-001234)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleVerification} disabled={isVerifying}>
                    {isVerifying ? "Verifying..." : "Verify"}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  Certificate IDs follow the format: CA-YYYY-CC-NNNNNN
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>CA: Corner Academy identifier</li>
                  <li>YYYY: Year of completion</li>
                  <li>
                    CC: Course code (WD=Web Dev, DS=Data Science, DM=Digital
                    Marketing)
                  </li>
                  <li>NNNNNN: Unique certificate number</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Verification Result */}
          {verificationResult && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Certificate Verified
                  </CardTitle>
                  <Badge variant="default" className="bg-green-500">
                    <Shield className="h-3 w-3 mr-1" />
                    Valid
                  </Badge>
                </div>
                <CardDescription>
                  This certificate is authentic and has been verified
                  successfully.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Certificate Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Student Name
                      </h4>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {verificationResult.studentName}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Course Name
                      </h4>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {verificationResult.courseName}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Instructor
                      </h4>
                      <span className="font-medium">
                        {verificationResult.instructor}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Completion Date
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {verificationResult.completionDate}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Issue Date
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {verificationResult.issueDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">
                          Grade
                        </h4>
                        <Badge variant="secondary">
                          {verificationResult.grade}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">
                          Credits
                        </h4>
                        <span className="font-medium">
                          {verificationResult.creditsEarned}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Skills Acquired */}
                <div>
                  <h4 className="font-medium mb-3">Skills Acquired</h4>
                  <div className="flex flex-wrap gap-2">
                    {verificationResult.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Certificate Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleDownloadCertificate}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShareCertificate}
                    className="flex-1 bg-transparent"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share Verification
                  </Button>
                </div>

                {/* Certificate ID */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Certificate ID</h4>
                  <code className="text-sm font-mono bg-background px-2 py-1 rounded">
                    {verificationResult.id}
                  </code>
                </div>
              </CardContent>
            </Card>
          )}

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
