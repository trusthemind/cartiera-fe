import React from "react";
import { Controller, Control } from "react-hook-form";
import { Input, Typography } from "antd";

interface CustomInputProps {
  label?: string;
  type: "text" | "password" | "number";
  placeholder?: string;
  error?: {
    message?: string;
  };
  name: string;
  control: Control<any>;
  rules?: any;
  valueType?: "string" | "number";
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  placeholder = "",
  error,
  name,
  control,
  rules = {},
  valueType = "string", 
}) => {
  return (
    <div>
      <Typography style={{ marginBottom: 4.5 }}>{label}</Typography>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) =>
          type === "text" || type === "number" ? (
            <Input
              {...field}
              type={type}
              value={valueType === "number" ? +field.value : field.value}
              status={fieldState.error ? "error" : ""}
              placeholder={placeholder}
            />
          ) : (
            <Input.Password
              {...field}
              status={fieldState.error ? "error" : ""}
              placeholder={placeholder}
            />
          )
        }
      />
      {error && error.message && (
        <Typography style={{ marginLeft: 10.5, marginTop: 2.5, color: "var(--error)" }}>
          {error.message}
        </Typography>
      )}
    </div>
  );
};
