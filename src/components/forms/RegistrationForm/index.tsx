"use client";
import { CustomInput } from "@/src/components/CustomInput";
import { registrationFormValues, RegistrationSchema } from "@/utils/validation/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import s from "./style.module.scss";
import { Button, Typography } from "antd";
import Link from "next/link";
import { AppRoutes } from "@/src/constants/constants";

export const RegistrationForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<registrationFormValues>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<registrationFormValues> = async (data) => {
    console.log(data.email);
    console.log(watch("email"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"formContainer"}>
      <CustomInput
        name="email"
        placeholder="Email"
        type="text"
        control={control}
        error={errors.email}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        type="password"
        control={control}
        error={errors.password}
      />
      <CustomInput
        name="confirm_password"
        placeholder="Confirm Password"
        type="password"
        control={control}
        error={errors.confirm_password}
      />
      <Typography style={{ textAlign: "center" }}>
        Already have an account?
        <br />
        <Link
          href={AppRoutes.Login}
          style={{ color: "var(--purple-dark)", textDecoration: "underline"}}
        >
          Login
        </Link>
      </Typography>
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
