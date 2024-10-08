"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Academic Department Must Be String",
            required_error: "Name is required",
        }),
        academicfaculty: zod_1.z.string({
            invalid_type_error: "Academic Department Must Be String",
            required_error: "Academic Faculty Is Required",
        }),
    }),
});
const updateAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Academic Department Must Be String",
            required_error: "Name is required",
        })
            .optional(),
        academicfaculty: zod_1.z
            .string({
            invalid_type_error: "Academic Department Must Be String",
            required_error: "Academic Faculty Is Required",
        })
            .optional(),
    }),
});
exports.AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};
