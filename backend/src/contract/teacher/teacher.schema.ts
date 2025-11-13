import { z } from "zod";

export const createTeacherSchema = z.object({
    name: z.string().min(2, "Name Field is required"),
    email: z.string().email("Email Field is required"),
    bio: z.string().min(10, "Bio or about is required"),
    noOfYearsExperience: z.number().min(0, "Number of experience is required"),
    expertise: z.string().min(2, "Expertise is required"),
    dob: z.date(),
    gender: z.enum(['male', 'female']),
});

export const getAllTeachersResponseSchema = z.array(
    z.object({
        id: z.string().uuid(),
        name: z.string(),
        email: z.string().email(),
        bio: z.string(),
        noOfYearsExperience: z.number(),
        expertise: z.string(),
        dob: z.date(),
        gender: z.enum(['male', 'female']),
        status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
);

export const getTeacherByIdSchema = z.object({
    id: z.string().uuid(),
});

export const getTeacherByIdResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    bio: z.string(),
    noOfYearsExperience: z.number(),
    expertise: z.string(),
    dob: z.date(),
    gender: z.enum(['male', 'female']),
    status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const updateTeacherParamsSchema = z.object({
    id: z.string().uuid(),
});

export const updateTeacherSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    bio: z.string().optional(),
    noOfYearsExperience: z.number().optional(),
    expertise: z.string().optional(),
    dob: z.date().optional(),
    gender: z.enum(['male', 'female']),
    status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']).optional(),
});

export const deleteTeacherSchema = z.object({
    id: z.string().uuid(),
});