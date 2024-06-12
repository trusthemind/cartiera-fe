"use client";
import { useLazyPostEngineQuery } from "@/src/api/engines";
import { EngineFormValues, EngineSchema } from "@/src/utils/validation/createEngineSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomInput } from "../../CustomInput";
import { Button, message, Select } from "antd";
import s from "./style.module.scss";
import { AppRoutes, CarsBrand, EngineFuel } from "@/src/constants/constants";
import { useRouter } from "next/navigation";

const fuelOption = [
  { value: EngineFuel.Petrol, label: "Бензин" },
  { value: EngineFuel.Diesel, label: "Дизель" },
  { value: EngineFuel.Propane, label: "Газ" },
  { value: EngineFuel.Electric, label: "Електро" },
  { value: EngineFuel.Hybrid, label: "Гібрид" },
];

export const EngineForm: FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EngineFormValues>({
    resolver: zodResolver(EngineSchema),
    mode: "onSubmit",
  });
  const [enginePostTrigger, { data: engineData, isLoading: engineLoading, isError: engineError }] =
    useLazyPostEngineQuery();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<EngineFormValues> = async (data, e) => {
    e?.preventDefault();

    enginePostTrigger({
      name: data.name,
      brand: data.brand,
      fuel: data.fuel,
      consumption: +data.consumption,
      cilinders: +data.cilinders,
    });
    engineData && message.success(engineData.message);
  };

  if (engineLoading) return <p>Loading</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"formContainer"}>
      <div className={s.block}>
      <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <Select
              style={{width: "50%"}}
              options={CarsBrand}
              placeholder={"Brand"}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          )}
        />
        <CustomInput
          name="name"
          placeholder="Name"
          type="text"
          control={control}
          error={errors.name}
        />
      </div>
      <div className={s.block}>
        <div className={s.selectBlock}>
          <Controller
            name="fuel"
            control={control}
            defaultValue={fuelOption[0].value}
            render={({ field }) => (
              <Select
                className={s.selectGroup}
                options={fuelOption}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>
        <CustomInput
          name="consumption"
          placeholder="Consumption"
          type="number"
          control={control}
          error={errors.consumption}
        />
      </div>
      <CustomInput
        name="cilinders"
        placeholder="Clinders"
        type="number"
        control={control}
        error={errors.cilinders}
      />
      <div className={s.buttonsBlock}>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          style={{ width: "100%", marginTop: "2rem" }}
        >
          Submit
        </Button>
        <Button
          htmlType="reset"
          type="dashed"
          size="large"
          style={{
            width: "100%",
            marginTop: "2rem",
            backgroundColor: "var(--black)",
            color: "var(--purple)",
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
