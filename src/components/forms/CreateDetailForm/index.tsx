"use client"
import { AppRoutes } from "@/src/constants/constants";
import { Button, Typography } from "antd";
import Link from "next/link";
import { CustomInput } from "../../CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { createDetailSchema, detailFormValues } from "@/src/utils/validation/createDetailSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateDetailForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<detailFormValues>({
    resolver: zodResolver(createDetailSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<detailFormValues> = async (data, e) => {
    e?.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"formContainer"}>
      <CustomInput
        name="name"
        placeholder="Name"
        type="text"
        control={control}
        error={errors.name}
      />
      <CustomInput
        name="condition"
        placeholder="Condition"
        type="text"
        control={control}
        error={errors.condition}
      />
      <CustomInput
        name="price"
        placeholder="number"
        type="text"
        control={control}
        error={errors.price}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        style={{ width: "100%", marginTop: "2rem", color: "black" }}
      >
        Submit
      </Button>
    </form>
  );
};
