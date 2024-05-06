import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const RegistrationSchema = zod.object({
  email: zod.string({ required_error: InputErrors.field.invalid }).email(InputErrors.field.invalid),
  password: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(8, InputErrors.field.min8)
    .max(16, InputErrors.field.max16),
});

export type registrationFormValues = zod.infer<typeof RegistrationSchema>; // Form interfaces
