import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SignupFormData } from "@/types";
import Link from "next/link";

interface StepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  errors?: Record<string, string>;
}

export const ProfessionalStep = ({
  formData,
  updateFormData,
  errors,
}: StepProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="image">Profile Image</Label>
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          updateFormData({ image: file });
        }}
        className={errors?.image ? "border-destructive" : ""}
      />
      <p className="text-xs text-muted-foreground">
        Optional: Upload a profile picture (Max 5MB)
      </p>
      {errors?.image && (
        <p className="text-sm text-destructive">{errors.image}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="educationInstitute">
        Education Institute <span className="text-destructive">*</span>
      </Label>
      <Input
        id="educationInstitute"
        placeholder="e.g., New York University"
        value={formData.educationInstitute}
        onChange={(e) => updateFormData({ educationInstitute: e.target.value })}
        className={errors?.educationInstitute ? "border-destructive" : ""}
      />
      {errors?.educationInstitute && (
        <p className="text-sm text-destructive">{errors.educationInstitute}</p>
      )}
    </div>
    <div className="space-y-2">
      <Label htmlFor="qualification">
        Highest Qualification <span className="text-destructive">*</span>
      </Label>
      <Input
        id="qualification"
        placeholder="e.g., Bachelor's in Computer Science"
        value={formData.qualification}
        onChange={(e) => updateFormData({ qualification: e.target.value })}
        className={errors?.qualification ? "border-destructive" : ""}
      />
      {errors?.qualification && (
        <p className="text-sm text-destructive">{errors.qualification}</p>
      )}
    </div>
    <div className="space-y-2">
      <Label htmlFor="about">About You</Label>
      <Textarea
        id="about"
        placeholder="Tell us a bit about your goals and interests..."
        value={formData.about}
        onChange={(e) => updateFormData({ about: e.target.value })}
        rows={4}
        className={errors?.about ? "border-destructive" : ""}
      />
      <p className="text-xs text-muted-foreground">
        Optional: Share your learning goals and interests
      </p>
      {errors?.about && (
        <p className="text-sm text-destructive">{errors.about}</p>
      )}
    </div>
    <div className="flex items-start space-x-3 pt-2">
      <Checkbox
        id="terms"
        checked={formData.agreeToTerms}
        onCheckedChange={(checked) =>
          updateFormData({ agreeToTerms: checked as boolean })
        }
        className={errors?.agreeToTerms ? "border-destructive" : ""}
      />
      <div className="space-y-1">
        <Label
          htmlFor="terms"
          className="text-sm font-normal leading-relaxed cursor-pointer"
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="text-primary hover:underline font-medium"
            target="_blank"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-primary hover:underline font-medium"
            target="_blank"
          >
            Privacy Policy
          </Link>
          <span className="text-destructive ml-1">*</span>
        </Label>
        {errors?.agreeToTerms && (
          <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
        )}
      </div>
    </div>
  </div>
);
