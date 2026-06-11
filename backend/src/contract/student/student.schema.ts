import z from 'zod';

export const createStudentSchema = z.object({
    uid: z.string().min(1),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Email is required"),
    phoneNumber: z.string().min(10, "Phone number is required"),
    gender: z.enum(['male', 'female', 'other']),
    image: z.string(),
    dob: z.string(),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    district: z.string().min(3, "District is required"),
    pincode: z.string().min(5, "Pincode is required"),
    country: z.string().min(2, "Country is required"),
    about: z.string().min(10, "About or bio is required"),
    educationInstitute: z.string().min(2, "Education institute is required"),
    qualification: z.string().min(2, "Qualification is required"),
});

export const getAllStudentsResponseSchema = z.array(
    z.object({
        id: z.string(),
        uid: z.string(),
        name: z.string(),
        email: z.string().email(),
        phoneNumber: z.string(),
        gender: z.enum(['male', 'female', 'other']),
        image: z.string(),
        dob: z.string(),
        address: z.string(),
        city: z.string(),
        district: z.string(),
        pincode: z.string(),
        country: z.string(),
        about: z.string(),
        educationInstitute: z.string(),
        qualification: z.string(),
        status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
);

export const getStudentByIdSchema = z.object({
    studentId: z.string(),
});

export const getStudentByIdResponseSchema = z.object({
    id: z.string(),
    uid: z.string(),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    image: z.string(),
    dob: z.string(),
    address: z.string(),
    city: z.string(),
    district: z.string(),
    pincode: z.string(),
    country: z.string(),
    about: z.string(),
    educationInstitute: z.string(),
    qualification: z.string(),
    status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const updateStudentParamsSchema = z.object({
    studentId: z.string(),
});

export const updateStudentSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    image: z.string().optional(),
    dob: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
    about: z.string().optional(),
    educationInstitute: z.string().optional(),
    qualification: z.string().optional(),
    status: z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']).optional(),
});

export const deleteStudentParamsSchema = z.object({
    studentId: z.string(),
});

export const deleteStudentSchema = z.object({});