import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const createCarSchema = zod.object({
  brand: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(4, InputErrors.field.lenght.min4)
    .max(24, InputErrors.field.lenght.max24),
  model: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(4, InputErrors.field.lenght.min4)
    .max(24, InputErrors.field.lenght.max24),
  year: zod.string({ required_error: InputErrors.field.invalid }).transform((value) => +value),
  price: zod.string({ required_error: InputErrors.field.invalid }).transform((value) => +value),
  kilometers: zod
    .string({ required_error: InputErrors.field.invalid })
    .transform((value) => +value),
  status: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(4, InputErrors.field.lenght.min4)
    .max(24, InputErrors.field.lenght.max24),
  engine_id: zod.string({ required_error: InputErrors.field.invalid }),
  ownerNumbers: zod
    .string({ required_error: InputErrors.field.invalid })
    .transform((value) => +value),
  ownerComment: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(8, InputErrors.field.lenght.min8)
    .max(24, InputErrors.field.lenght.max24),
  vinCode: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(8, InputErrors.field.lenght.min8)
    .max(24, InputErrors.field.lenght.max24),
  placement: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(8, InputErrors.field.lenght.min8)
    .max(24, InputErrors.field.lenght.max24),
});

export type carFormValues = zod.infer<typeof createCarSchema>; // Form interfaces
