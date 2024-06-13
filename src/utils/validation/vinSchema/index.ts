import * as zod from "zod";
import { InputErrors } from "@/src/constants/errors";

export const VinCodeSchema = zod.object({
  vin_code: zod.string().refine(
    (vin) => {
      if (vin.length !== 17) {
        return false;
      }
      
      const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
      return vinRegex.test(vin);
    },
    {
      message: InputErrors.field.invalidText("Vin Code"),
    }
  ),
});

export type VinCodeFormValue = zod.infer<typeof VinCodeSchema>; // Form interfaces
