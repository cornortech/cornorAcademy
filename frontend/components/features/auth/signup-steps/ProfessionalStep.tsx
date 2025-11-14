import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SignupFormData } from "@/types";
import Link from "next/link";

interface StepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
}

export const ProfessionalStep = ({ formData, updateFormData }: StepProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="educationInstitute">Education Institute</Label>
      <Input
        id="educationInstitute"
        placeholder="e.g., New York University"
        value={formData.educationInstitute}
        onChange={(e) => updateFormData({ educationInstitute: e.target.value })}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="qualification">Highest Qualification</Label>
      <Input
        id="qualification"
        placeholder="e.g., Bachelor's in Computer Science"
        value={formData.qualification}
        onChange={(e) => updateFormData({ qualification: e.target.value })}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="about">About You</Label>
      <Textarea
        id="about"
        placeholder="Tell us a bit about your goals and interests..."
        value={formData.about}
        onChange={(e) => updateFormData({ about: e.target.value })}
      />
    </div>
    <div className="flex items-start space-x-3 pt-2">
      <Checkbox
        id="terms"
        checked={formData.agreeToTerms}
        onCheckedChange={(checked) =>
          updateFormData({ agreeToTerms: checked as boolean })
        }
      />
      <Label htmlFor="terms" className="text-sm font-normal">
        I agree to the{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </Label>
    </div>
  </div>
);
