"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchema = void 0;
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .max(20, "First name can not be more then 20 characters"),
    middleName: zod_1.z.string().trim().optional(),
    lastName: zod_1.z.string().trim().min(1, "Last Name can not be less then 1 "),
});
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1),
    fatherOccupation: zod_1.z.string().trim().min(1),
    fatherContactNo: zod_1.z.string().trim().min(1),
    motherName: zod_1.z.string().trim().min(1),
    motherOccupation: zod_1.z.string().trim().min(1),
    motherContactNo: zod_1.z.string().trim().min(1),
});
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1),
    occupation: zod_1.z.string().trim().min(1),
    contactNo: zod_1.z.string().trim().min(1),
    address: zod_1.z.string().trim().min(1),
});
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        student: zod_1.z.object({
            name: userNameValidationSchema,
            gender: zod_1.z.enum(["male", "female"]),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().trim().email("Valid email is required"),
            contactNo: zod_1.z
                .string()
                .trim()
                .min(8, "Contact Min 8 chrt")
                .max(15, "Contact Min 15 chrt"),
            emergencyContactNo: zod_1.z
                .string()
                .trim()
                .min(8, "Contact Min 8 chrt")
                .max(15, "Contact Min 15 chrt"),
            bloodGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
            presentAddress: zod_1.z.string().trim(),
            permanentAddress: zod_1.z.string().trim(),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            admissionSemester: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
            profileImg: zod_1.z.string().trim().optional(),
        }),
    }),
});
const updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: userNameValidationSchema,
            gender: zod_1.z.enum(["male", "female"]).optional(),
            dateOfBirth: zod_1.z.string().optional().optional(),
            email: zod_1.z.string().trim().email("Valid email is required").optional(),
            contactNo: zod_1.z
                .string()
                .trim()
                .min(8, "Contact Min 8 chrt")
                .max(15, "Contact Min 15 chrt")
                .optional(),
            emergencyContactNo: zod_1.z
                .string()
                .trim()
                .min(8, "Contact Min 8 chrt")
                .max(15, "Contact Min 15 chrt")
                .optional(),
            bloodGroup: zod_1.z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional(),
            presentAddress: zod_1.z.string().trim().optional(),
            permanentAddress: zod_1.z.string().trim().optional(),
            guardian: guardianValidationSchema.optional(),
            localGuardian: localGuardianValidationSchema.optional(),
            admissionSemester: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().trim().optional(),
        }),
    }),
});
exports.studentValidationSchema = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
