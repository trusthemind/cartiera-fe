import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const EngineSchema = zod.object({
  brand: zod
    .string({ required_error: InputErrors.field.invalid })
    .max(16, InputErrors.field.lenght.max16),
  name: zod
    .string({ required_error: InputErrors.field.invalid })
    .max(16, InputErrors.field.lenght.max16),
  fuel: zod
    .string({ required_error: InputErrors.field.invalid })
    .max(16, InputErrors.field.lenght.max16),
  cilinders: zod
    .string({ required_error: InputErrors.field.invalid })
    .regex(/^\d+$/, InputErrors.field.invalid),
  consumption: zod
    .string({ required_error: InputErrors.field.invalid })
    .regex(/^\d+$/, InputErrors.field.invalid),
});

export type EngineFormValues = zod.infer<typeof EngineSchema>;
