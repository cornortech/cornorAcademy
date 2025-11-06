import z from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    uid: z.string().min(1), // Firebase UID
    googleId: z.string().min(1).optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const loginResponseSchema = z.object({
    uid: z.string(),
    _id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(["viewer", "publisher"]),
});

export const logout = z.object({});

export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
});

export const resendOtpSchema = z.object({
    email: z.string().email(),
});

export const changePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
});

export const sendForgotPasswordOtpSchema = z.object({
    email: z.string().email(),
});

export const verifyForgotPasswordOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().min(6),
});

export const resetPasswordAfterOtpSchema = z.object({
    email: z.string().email(),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
});

export const getProfileSchema = z.object({
    userId: z.string(),
    uid: z.string(),
    email: z.string().email(),
    role: z.enum(["student", "teacher", "admin"]).optional()
});

export const loginSuccessSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    user: z.object({
        _id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        role: z.enum(["publisher", "viewer"]),
        email: z.string().email(),
        isVerified: z.boolean(),
    }),
    accessToken: z.string(),
    refreshToken: z.string(),
});

export const updateUserDetailsSchema = z.object({
    userId: z.string(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    image: z.string().url().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().min(7).optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    role: z.enum(["viewer", "publisher"]).optional(),
});

export const getUserDetailSchema = z.object({
    success: z.literal(true),
    user: z.object({
        _id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        role: z.string(),
        bio: z.string(),
        location: z.string(),
        phoneNumber: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    }),
});

export const checkIfUserExistsResponseSchema = z.object({
    exists: z.boolean(),
    userId: z.string().nullable(),
    uid: z.string().nullable(),
    providers: z.array(z.enum(["google", "local"])),
});
