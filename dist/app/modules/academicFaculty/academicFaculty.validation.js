"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = require("zod");
const createAcademicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Academic Faculty Must Be String",
        }),
    }),
});
const updateAcademicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Academic Faculty Must Be String",
        }),
    }),
});
exports.AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema,
};
