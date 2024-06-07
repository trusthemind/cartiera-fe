import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const createDetailSchema = zod.object({
  name: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(8, InputErrors.field.lenght.min8)
    .max(24, InputErrors.field.lenght.max24),
  price: zod
    .number({ required_error: InputErrors.field.invalid })
    .positive(InputErrors.field.positive),
  condition: zod
    .string({ required_error: InputErrors.field.invalid })
    .min(8, InputErrors.field.lenght.min8)
    .max(24, InputErrors.field.lenght.max24),
});

export type detailFormValues = zod.infer<typeof createDetailSchema>; // Form interfaces
