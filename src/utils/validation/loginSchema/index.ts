import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const LoginSchema = zod.object({
  email: zod.string({ required_error: InputErrors.field.invalid }).email(InputErrors.field.invalid),
  password: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(8, InputErrors.field.lenght.min8)
    .max(16, InputErrors.field.lenght.max16),
});

export type loginFormValues = zod.infer<typeof LoginSchema>; // Form interfaces
