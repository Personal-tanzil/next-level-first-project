import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Department Must Be String",
      required_error: "Name is required",
    }),
    academicfaculty: z.string({
      invalid_type_error: "Academic Department Must Be String",
      required_error: "Academic Faculty Is Required",
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department Must Be String",
        required_error: "Name is required",
      })
      .optional(),
    academicfaculty: z
      .string({
        invalid_type_error: "Academic Department Must Be String",
        required_error: "Academic Faculty Is Required",
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
