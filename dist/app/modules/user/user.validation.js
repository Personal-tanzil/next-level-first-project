"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: "Password Must Be String",
    })
        .max(20, { message: "Password can not be more then 20 chracter" })
        .min(6, { message: "Password can not me less then 6 character" })
        .optional(),
});
exports.userValidation = {
    userValidationSchema,
};
