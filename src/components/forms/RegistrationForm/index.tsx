"use client";
import { CustomInput } from "@/src/components/CustomInput";
import {
  registrationFormValues,
  RegistrationSchema,
} from "@/src/utils/validation/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./style.module.scss";
import { Button, message, Spin, Typography } from "antd";
import Link from "next/link";
import { AppRoutes } from "@/src/constants/constants";
import { useLazyRegistrationQuery } from "@/src/api/auth";

export const RegistrationForm = () => {
  const [registerTrigger, { data: registerData, isLoading, isError }] = useLazyRegistrationQuery();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<registrationFormValues>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<registrationFormValues> = async (data) => {
    try {
      await registerTrigger({ name: data.name, email: data.email, password: data.password }, true).unwrap();
      reset();
      message.success(`User with name: ${data.name} has been registered`);
    } catch (error) {
      message.error("Registration failed");
    }
  };

  if (isLoading) return <Spin />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"formContainer"}>
      <CustomInput
        name="name"
        placeholder="Username"
        type="text"
        control={control}
        error={errors.name}
      />
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
          style={{ color: "var(--purple-dark)", textDecoration: "underline" }}
        >
          Login
        </Link>
      </Typography>
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        style={{ width: "100%", marginTop: "2rem" }}
      >
        Submit
      </Button>
    </form>
  );
};
