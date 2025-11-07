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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Check, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Canvas } from "@/components/signature-canvas";

export default function LegalAgreementPage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [agreedToRefund, setAgreedToRefund] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [signaturePad, setSignaturePad] = useState<any>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isAgreementSigned, setIsAgreementSigned] = useState(false);

  const handleSignature = (canvas: any) => {
    setSignaturePad(canvas);
  };

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

  const handleCompleteAgreement = () => {
    if (
      agreedToTerms &&
      agreedToPolicy &&
      agreedToRefund &&
      isSigned &&
      studentName &&
      studentEmail
    ) {
      setIsAgreementSigned(true);
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
                <span className="text-xl font-bold">Corner Academy</span>
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
              Your legal agreement has been signed and recorded. A confirmation
              email has been sent to {studentEmail}.
            </p>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 text-sm">
              <p className="text-green-800 dark:text-green-200">
                You are now authorized to proceed with course enrollment. This
                agreement establishes the terms between you and Corner Academy
                for your course participation.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/enroll/1">Proceed to Enrollment</Link>
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
              <span className="text-xl font-bold">Corner Academy</span>
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
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>
                  Legal agreement between Corner Academy and Student regarding
                  course enrollment and participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 pr-4">
                  <div className="space-y-4 text-sm leading-relaxed">
                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        1. Course Enrollment Agreement
                      </h3>
                      <p className="text-muted-foreground">
                        This agreement is entered into between Corner Academy
                        ("Academy") and the student ("You" or "Student")
                        regarding your enrollment in the course offered by the
                        Academy. By signing this agreement, both parties
                        acknowledge and agree to the terms and conditions
                        outlined herein.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        2. Course Payment & Commitment
                      </h3>
                      <p className="text-muted-foreground">
                        The student agrees to pay the full course fee as
                        specified at the time of enrollment. Payment is
                        non-refundable after 30 days from the enrollment date,
                        except as provided in Section 4. The student commits to
                        completing the course to the best of their ability and
                        maintaining professional conduct throughout the program.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        3. Course Withdrawal & Cancellation
                      </h3>
                      <p className="text-muted-foreground">
                        If the student wishes to withdraw from the course after
                        enrollment, they must provide written notice to the
                        Academy within 30 days of enrollment. Withdrawal after
                        this period will result in forfeiture of the course fee.
                        The Academy reserves the right to cancel a course if
                        minimum enrollment is not met, in which case a full
                        refund will be issued.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        4. Breach of Agreement & Legal Action
                      </h3>
                      <p className="text-muted-foreground">
                        Any student who leaves the course after full or partial
                        payment without valid grounds and prior agreement with
                        the Academy will be considered in breach of this
                        agreement. The Academy reserves the right to pursue
                        legal action to recover outstanding fees, damages, or
                        any other liabilities. This may include but is not
                        limited to civil proceedings, debt recovery, and claims
                        for punitive damages where applicable under law.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        5. Student Responsibilities
                      </h3>
                      <div className="text-muted-foreground">
                        The student agrees to:
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                          <li>
                            Attend all scheduled classes and sessions as
                            required
                          </li>
                          <li>
                            Maintain professional conduct and respect the
                            Academy's code of conduct
                          </li>
                          <li>Submit assignments and projects on time</li>
                          <li>
                            Comply with all Academy policies and procedures
                          </li>
                          <li>
                            Not engage in plagiarism or academic dishonesty
                          </li>
                          <li>
                            Maintain confidentiality of proprietary course
                            materials
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        6. Academy's Obligations
                      </h3>
                      <div className="text-muted-foreground">
                        Corner Academy agrees to:
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                          <li>
                            Provide quality instruction and course materials
                          </li>
                          <li>
                            Maintain professional standards in all interactions
                          </li>
                          <li>
                            Support student learning through designated channels
                          </li>
                          <li>
                            Issue certificates upon course completion (if
                            applicable)
                          </li>
                          <li>Maintain student data confidentiality</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        7. Limitation of Liability
                      </h3>
                      <p className="text-muted-foreground">
                        Corner Academy shall not be liable for any indirect,
                        incidental, or consequential damages arising from course
                        participation. The Academy's total liability is limited
                        to the amount paid by the student for the course.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        8. Governing Law
                      </h3>
                      <p className="text-muted-foreground">
                        This agreement shall be governed by and construed in
                        accordance with the laws of the jurisdiction in which
                        Corner Academy operates. Any disputes arising from this
                        agreement shall be subject to the exclusive jurisdiction
                        of the courts in that jurisdiction.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        9. Modification of Terms
                      </h3>
                      <p className="text-muted-foreground">
                        Corner Academy reserves the right to modify these terms
                        and conditions with 30 days' notice to enrolled
                        students. Continued participation in the course
                        constitutes acceptance of modified terms.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-base mb-2">
                        10. Entire Agreement
                      </h3>
                      <p className="text-muted-foreground">
                        This agreement constitutes the entire agreement between
                        the student and Corner Academy regarding course
                        enrollment and supersedes all prior negotiations,
                        understandings, and agreements.
                      </p>
                    </section>
                  </div>
                </ScrollArea>
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
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
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
                  !isSigned ||
                  !studentName ||
                  !studentEmail) && (
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
