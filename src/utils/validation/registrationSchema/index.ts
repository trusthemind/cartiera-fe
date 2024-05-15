import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const RegistrationSchema = zod
  .object({
    name: zod
      .string({ required_error: InputErrors.field.req })
      .min(4, InputErrors.field.lenght.min8),
    email: zod.string({ required_error: InputErrors.field.req }).email(InputErrors.field.invalid),
    password: zod
      .string({ required_error: InputErrors.field.req })
      .min(8, InputErrors.field.lenght.min8)
      .max(16, InputErrors.field.lenght.max16),
    confirm_password: zod
      .string({ required_error: InputErrors.field.req })
      .min(8, InputErrors.field.lenght.min8)
      .max(16, InputErrors.field.lenght.max16),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: InputErrors.field.notMatch,
  });

export type registrationFormValues = zod.infer<typeof RegistrationSchema>; // Form interfaces
