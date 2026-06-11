"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { Upload, User } from "lucide-react";
import { SignupFormData } from "@/lib/validations/auth";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StepProps {
  control: Control<SignupFormData>;
}

export const TeacherProfessionalStep = ({ control }: StepProps) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="image"
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>
              Profile Image <span className="text-destructive">*</span>
            </FormLabel>
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-border">
                <AvatarImage
                  src={imagePreview}
                  alt="Profile preview"
                  className="object-cover"
                />
                <AvatarFallback className="bg-muted flex items-center justify-center">
                  <User className="h-12 w-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <FormLabel
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {imagePreview ? "Change Image" : "Upload Image"}
                </FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files && event.target.files[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert("Image size must be less than 5MB");
                          return;
                        }
                        onChange(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG or PNG (Max 5MB)
                </p>
                <FormMessage />
              </div>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Bio / About You <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about your teaching experience and background..."
                rows={4}
                {...field}
              />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              Share your expertise and what makes you a great teacher
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="expertise"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Expertise / Specialization <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Web Development, Data Science"
                {...field}
                autoComplete="off"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="noOfYearsExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Years of Experience <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="1"
                placeholder="e.g., 5"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="agreeToTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-2 space-y-0 pt-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-normal leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link
                  href="/legal-agreement"
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/legal-agreement"
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
