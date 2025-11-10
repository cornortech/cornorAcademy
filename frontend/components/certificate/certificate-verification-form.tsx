"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { AlertCircle, Search } from "lucide-react";

interface CertificateVerificationFormProps {
  onVerify: (certificateId: string) => void;
  isVerifying: boolean;
}

const CertificateVerificationForm = ({
  onVerify,
  isVerifying,
}: CertificateVerificationFormProps) => {
  const [certificateId, setCertificateId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(certificateId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button disabled={isVerifying || !certificateId.trim()}>
            {isVerifying ? (
              "Verifying..."
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Verify
              </>
            )}
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
            CC: Course code (WD=Web Dev, DS=Data Science, DM=Digital Marketing)
          </li>
          <li>NNNNNN: Unique certificate number</li>
        </ul>
      </div>
    </form>
  );
};

export default CertificateVerificationForm;
