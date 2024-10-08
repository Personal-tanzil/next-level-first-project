import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First name can not be more then 20 characters"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last Name can not be less then 1 "),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().trim().min(1),
  fatherContactNo: z.string().trim().min(1),
  motherName: z.string().trim().min(1),
  motherOccupation: z.string().trim().min(1),
  motherContactNo: z.string().trim().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1),
  occupation: z.string().trim().min(1),
  contactNo: z.string().trim().min(1),
  address: z.string().trim().min(1),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"]),
      dateOfBirth: z.string().optional(),
      email: z.string().trim().email("Valid email is required"),
      contactNo: z
        .string()
        .trim()
        .min(8, "Contact Min 8 chrt")
        .max(15, "Contact Min 15 chrt"),
      emergencyContactNo: z
        .string()
        .trim()
        .min(8, "Contact Min 8 chrt")
        .max(15, "Contact Min 15 chrt"),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string().trim(),
      permanentAddress: z.string().trim(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().trim().optional(),
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"]).optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z.string().trim().email("Valid email is required").optional(),
      contactNo: z
        .string()
        .trim()
        .min(8, "Contact Min 8 chrt")
        .max(15, "Contact Min 15 chrt")
        .optional(),
      emergencyContactNo: z
        .string()
        .trim()
        .min(8, "Contact Min 8 chrt")
        .max(15, "Contact Min 15 chrt")
        .optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      guardian: guardianValidationSchema.optional(),
      localGuardian: localGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().trim().optional(),
    }),
  }),
});

export const studentValidationSchema = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
