import { z } from "zod";

export const accountStepSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const personalStepSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"], { error: "Invalid gender" }),
  dob: z.string(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  district: z.string().min(2, "District must be at least 2 characters"),
  pincode: z.string().min(4, "Pincode must be at least 4 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

export const professionalStepSchema = z.object({
  educationInstitute: z
    .string()
    .min(2, "Education institute must be at least 2 characters"),
  qualification: z
    .string()
    .min(2, "Qualification must be at least 2 characters"),
  about: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(8, "Invalid phone number"),
    gender: z.enum(["male", "female", "other"]),
    image: z.any().optional(),
    dob: z.string(),
    address: z.string().min(5),
    city: z.string().min(2),
    district: z.string().min(2),
    pincode: z.string().min(4),
    country: z.string().min(2),
    about: z.string().optional(),
    educationInstitute: z.string().min(2),
    qualification: z.string().min(2),
    agreeToTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type AccountStepData = z.infer<typeof accountStepSchema>;
export type PersonalStepData = z.infer<typeof personalStepSchema>;
export type ProfessionalStepData = z.infer<typeof professionalStepSchema>;
