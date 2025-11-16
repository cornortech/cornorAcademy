import z from "zod";

export const registerSchema = z.object({
    uid: z.string().min(1), // Firebase UID
    name: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(8),
    gender: z.enum(['male', 'female', 'other']),
    image: z.string(),
    dob: z.string().regex(/^(?:(?:19|20)\d{2})-(?:(?:0[1-9]|1[0-2]))-(?:(?:0[1-9]|1\d|2\d|3[01]))$/, 
        "Invalid date format. Use YYYY-MM-DD"),
    address: z.string(),
    city: z.string(),
    district: z.string(),
    pincode: z.string(),
    country: z.string(),
    about: z.string(),
    educationInstitute: z.string(),
    qualification: z.string(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const loginResponseSchema = z.object({
    uid: z.string(),
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    status: z.enum(["registered", "portalActivated", "portalDeactivated", "rejected"]).optional(),
    role: z.enum(["student", "teacher", "admin"]),
});

export const logout = z.object({});

export const getProfileSchema = z.object({
    userId: z.string(),
    uid: z.string(),
    email: z.string().email(),
    role: z.enum(["student", "teacher", "admin"]).optional()
});

export const updateStudentDetailsSchema = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']),
    image: z.string().nullable().optional(),
    dob: z.string().regex(/^(?:(?:19|20)\d{2})-(?:(?:0[1-9]|1[0-2]))-(?:(?:0[1-9]|1\d|2\d|3[01]))$/).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
    about: z.string().optional(),
    educationInstitute: z.string().optional(),
    qualification: z.string().optional(),
});