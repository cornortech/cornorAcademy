import { z } from "zod";

export const createTeacherSchema = z.object({
    uid: z.string().min(1),
    name: z.string().min(2, "Name Field is required"),
    email: z.string().email("Email Field is required"),
    image: z.string(),
    bio: z.string().min(10, "Bio or about is required"),
    noOfYearsExperience: z.number().min(0, "Number of experience is required"),
    expertise: z.string().min(2, "Expertise is required"),
    dob: z.string(),
    gender: z.enum(['male', 'female', 'other']),
});

export const getAllTeachersResponseSchema = z.array(
    z.object({
        id: z.string().uuid(),
        uid: z.string(),
        name: z.string(),
        email: z.string().email(),
        image: z.string(),
        bio: z.string(),
        noOfYearsExperience: z.number(),
        expertise: z.string(),
        dob: z.string(),
        gender: z.enum(['male', 'female', 'other']),
        status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
        isApproved: z.boolean(),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
);

export const getTeacherByIdSchema = z.object({
    teacherId: z.string().uuid(),
});

export const getTeacherByIdResponseSchema = z.object({
    id: z.string().uuid(),
    uid: z.string(),
    name: z.string(),
    email: z.string().email(),
    image: z.string(),
    bio: z.string(),
    noOfYearsExperience: z.number(),
    expertise: z.string(),
    dob: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
    isApproved: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const updateTeacherParamsSchema = z.object({
    teacherId: z.string().uuid(),
});

export const updateTeacherSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
    bio: z.string().optional(),
    noOfYearsExperience: z.number().optional(),
    expertise: z.string().optional(),
    dob: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']).optional(),
    isApproved: z.boolean().optional(),
});

export const deleteTeacherParamsSchema = z.object({
    teacherId: z.string().uuid(),
});

export const deleteTeacherSchema = z.object({});