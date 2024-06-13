"use client"
import React from "react";
import { VinCodeFormValue, VinCodeSchema } from "@/src/utils/validation/vinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomInput } from "../../CustomInput";
import { Button, Card } from "antd";
import { useLazyGetVerifyVinCodeQuery } from "@/src/api/car";

export const VinCodeForm: FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VinCodeFormValue>({
    resolver: zodResolver(VinCodeSchema),
    mode: "onSubmit",
  });

  const [trigger, { data }] = useLazyGetVerifyVinCodeQuery();

  const onSubmit: SubmitHandler<VinCodeFormValue> = async (formData, e) => {
    e?.preventDefault();
    trigger({ vin_code: formData.vin_code });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput type="text" name="vin_code" control={control} error={errors.vin_code} />
        <Button type="primary" htmlType="submit">
          Check
        </Button>
      </form>
      {data && (
        <Card>
          <h3>VIN Details</h3>
          <p>
            <strong>VIN:</strong> {data.vin}
          </p>
          <p>
            <strong>Country:</strong> {data.country}
          </p>
          <p>
            <strong>Region:</strong> {data.region}
          </p>
          <p>
            <strong>WMI:</strong> {data.wmi}
          </p>
          <p>
            <strong>VDS:</strong> {data.vds}
          </p>
          <p>
            <strong>VIS:</strong> {data.vis}
          </p>
          {/* <p>
            <strong>Years:</strong> {data.years.join(", ")}
          </p> */}
        </Card>
      )}
    </div>
  );
};

// Style object for the card
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "20px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};
