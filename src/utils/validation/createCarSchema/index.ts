import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const CarSchema = zod.object({
  
});

export type CarFormValues = zod.infer<typeof CarSchema>;
