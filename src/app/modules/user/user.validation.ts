import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password Must Be String",
    })
    .max(20, { message: "Password can not be more then 20 chracter" })
    .min(6, { message: "Password can not me less then 6 character" })
    .optional(),
});
export const userValidation = {
  userValidationSchema,
};
