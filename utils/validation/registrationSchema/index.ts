import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const RegistrationSchema = zod
  .object({
    email: zod
      .string({ required_error: InputErrors.field.invalid })
      .email(InputErrors.field.invalid),
    password: zod
      .string({ required_error: InputErrors.field.invalid })
      .min(8, InputErrors.field.min8)
      .max(16, InputErrors.field.max16),
    confirm_password: zod
      .string({ required_error: InputErrors.field.invalid })
      .min(8, InputErrors.field.min8)
      .max(16, InputErrors.field.max16),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: InputErrors.field.notMatch,
  });

export type registrationFormValues = zod.infer<typeof RegistrationSchema>; // Form interfaces
