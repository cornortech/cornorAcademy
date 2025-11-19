"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SignupFormData } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Upload, User } from "lucide-react";

interface StepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  errors?: Record<string, string>;
}

export const ProfessionalStep = ({
  formData,
  updateFormData,
  errors,
}: StepProps) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      updateFormData({ image: file });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label>
          Profile Image <span className="text-destructive">*</span>
        </Label>
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24 border-2 border-border">
            <AvatarImage
              src={imagePreview}
              alt="Profile preview"
              className="object-cover"
            />
            <AvatarFallback className="bg-muted">
              <User className="h-12 w-12 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Label
              htmlFor="image"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Upload className="h-4 w-4" />
              {imagePreview ? "Change Image" : "Upload Image"}
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground mt-2">
              JPG or PNG (Max 5MB)
            </p>
          </div>
        </div>
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
          placeholder="e.g.,Tribhuvan University"
          value={formData.educationInstitute}
          onChange={(e) =>
            updateFormData({ educationInstitute: e.target.value })
          }
          className={errors?.educationInstitute ? "border-destructive" : ""}
        />
        {errors?.educationInstitute && (
          <p className="text-sm text-destructive">
            {errors.educationInstitute}
          </p>
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
          placeholder="Tell us about your learning goals and interests..."
          value={formData.about}
          onChange={(e) => updateFormData({ about: e.target.value })}
          rows={4}
          className={errors?.about ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">
          Share your background and what you hope to achieve
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
};
