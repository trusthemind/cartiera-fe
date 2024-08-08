import React, { FC, ReactNode } from "react";
import { Controller, Control } from "react-hook-form";
import { Input, InputProps, Typography } from "antd";
import { PasswordProps, TextAreaProps } from "antd/es/input";

interface CustomInputProps {
  label?: string;
  type: "text" | "password" | "number" | "area";
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
        render={({ field, fieldState }) => {
          const props = {
            ...field,
            status: fieldState.error ? "error" : "" as "" | "error" | "warning",
            placeholder,
          };
          switch (type) {
            case "password":
              return <Input.Password {...props} />;
            case "text":
            case "number":
              return (
                <Input
                  {...props}
                  type={type}
                  value={valueType === "number" ? +field.value : field.value}
                />
              );
            case "area":
              return <Input.TextArea {...props} />;
            default:
              return <Input {...props} />;
          }
        }}
      />
      {error && error.message && (
        <Typography style={{ marginLeft: 10.5, marginTop: 2.5, color: "var(--error)" }}>
          {error.message}
        </Typography>
      )}
    </div>
  );
};
