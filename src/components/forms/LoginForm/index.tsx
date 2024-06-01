"use client";
import { loginFormValues, LoginSchema } from "@/src/utils/validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomInput } from "../../CustomInput";
import Link from "next/link";
import { AppRoutes } from "@/src/constants/constants";
import { Button, Typography } from "antd";
import { useLazyLoginQuery } from "@/src/api/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const LoginForm = () => {
  const [loginTrigger, { data: loginData, isLoading: loginLoading, isError: loginError }] =
    useLazyLoginQuery();
  const { push } = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<loginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<loginFormValues> = async (data, e) => {
    await loginTrigger({ email: data.email, password: data.password });

      console.log(loginData)
      // Cookies.set("key", token, { secure: true, expires: 1 });
      // push(AppRoutes.Home);
  };
  
  if (loginLoading) 
    return <p>Loading</p>;
  
  if (loginError)
    return <p>Error</p>;

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
      <Typography style={{ textAlign: "center" }}>
        Dont have account?
        <Link
          href={AppRoutes.Register}
          style={{ marginLeft: "0.5rem", color: "var(--purple-dark)", textDecoration: "underline" }}
        >
          Create new
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
