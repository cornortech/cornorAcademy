"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Shield,
  User,
  GraduationCap,
  Calendar,
  Download,
  Share,
} from "lucide-react";
import { Certificate } from "@/types";

interface CertificateDetailsProps {
  certificate: Certificate;
  onDownload?: () => void;
  onShare?: () => void;
}

export function CertificateDetails({
  certificate,
  onDownload,
  onShare,
}: CertificateDetailsProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                Certificate Verified
              </h3>
              <p className="text-green-700 dark:text-green-300">
                This certificate is authentic and valid
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Certificate ID</Label>
                <p className="font-mono text-lg">{certificate.id}</p>
              </div>

              <div>
                <Label>Student Name</Label>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-medium">
                    {certificate.studentName}
                  </span>
                </div>
              </div>

              <div>
                <Label>Course Name</Label>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-medium">
                    {certificate.courseName}
                  </span>
                </div>
              </div>

              <div>
                <Label>Instructor</Label>
                <p className="text-lg">{certificate.instructor}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Completion Date</Label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg">{certificate.completionDate}</p>
                </div>
              </div>

              <div>
                <Label>Issue Date</Label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg">{certificate.issueDate}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div>
                  <Label>Grade</Label>
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {certificate.grade}
                  </Badge>
                </div>
                <div>
                  <Label>Credits</Label>
                  <span className="font-medium">
                    {certificate.creditsEarned} credits
                  </span>
                </div>
              </div>

              <div>
                <Label>Status</Label>
                <Badge variant="default" className="bg-green-500">
                  <Shield className="h-3 w-3 mr-1" />
                  Valid
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Label>Skills & Competencies Covered</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {certificate.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={onDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
            <Button
              variant="outline"
              onClick={onShare}
              className="flex-1 bg-transparent"
            >
              <Share className="h-4 w-4 mr-2" />
              Share Certificate
            </Button>
          </div>

          <div className="bg-muted/20 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Verified on {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}. Issued by Cornor Academy.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
