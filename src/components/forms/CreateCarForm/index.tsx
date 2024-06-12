"use client";
import { AppRoutes, CarsBrand } from "@/src/constants/constants";
import { Button, message, Select, Spin, Typography, UploadProps } from "antd";
import Link from "next/link";
import { CustomInput } from "../../CustomInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createCarSchema, carFormValues } from "@/src/utils/validation/createCarSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLazyPostDetailsQuery } from "@/src/api/details";
import s from "./style.module.scss";
import { useLazyCreateCarQuery } from "@/src/api/car";
import { useLazyGetByBrandEnignesQuery } from "@/src/api/engines";
import { ExIEngine } from "@/src/api/engines/engines.types";

const { Dragger } = Upload;

export const CreateCarForm = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [carBrand, setCarBrand] = useState<string>("");
  const [engineState, setEngineState] = useState<{ value: number | undefined; label: string }[]>(
    []
  );
  const props: UploadProps = {
    name: "file",
    multiple: true,
    fileList: fileList,
    onChange(info) {
      setFileList([...info.fileList]);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
    
  };

  const {
    register,
    watch,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<carFormValues>({
    resolver: zodResolver(createCarSchema),
    mode: "onSubmit",
  });
  const [triggerCreateCar, { data: createCarData, isLoading, isError }] = useLazyCreateCarQuery();
  const [triggerGetEngine, { data: engineData }] = useLazyGetByBrandEnignesQuery();

  useEffect(() => {
    if (carBrand) triggerGetEngine(carBrand);
  }, [carBrand]);

  useEffect(() => {
    const engines = engineData?.data.map((item) => ({
      value: item.ID,
      label: `${item.brand} ${item.name}`,
    }));
    if (engines) setEngineState(engines);
  }, [carBrand, engineData]);

  const onSubmit: SubmitHandler<carFormValues> = async (data, e) => {
    e?.preventDefault();
    if (data) {
      const formData = new FormData();
      const inputedData = {
        brand: data.brand,
        car_model: data.model,
        year: data.year,
        price: data.price,
        kilometers: data.kilometers,
        status: data.status,
        owners_number: data.ownerNumbers,
        owner_comment: data.ownerComment,
        vin_code: data.vinCode,
        placement: data.placement,
        engine_id: data.engine_id,
      };
      formData.append("data", JSON.stringify(inputedData));
      fileList.forEach((file) => {
        formData.append("upload[]", file.originFileObj);
      });

      triggerCreateCar(formData);
      await message.success(createCarData?.message)
    }
  };

  if (isLoading) return <Spin/>
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"formContainer"}>
      <Dragger {...props} style={{ minHeight: "14rem" }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <b style={{ fontSize: 16 }}>Upload photo of your details for selling</b>
        <p>Drag photos here on click and select to upload</p>
      </Dragger>
      <div className={s.cardBlock}>
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <Select
              className={s.selectGroup}
              options={CarsBrand}
              placeholder={"Brand"}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setCarBrand(value);
              }}
            />
          )}
        />
        <CustomInput
          name="model"
          placeholder="model"
          type="text"
          control={control}
          error={errors.model}
        />
      </div>
      <div className={s.cardBlock}>
        <CustomInput
          name="year"
          placeholder="year"
          type="number"
          control={control}
          error={errors.year}
        />
        <CustomInput
          name="price"
          placeholder="price"
          type="number"
          control={control}
          error={errors.price}
        />
      </div>
      <div className={s.cardBlock}>
        <CustomInput
          name="kilometers"
          placeholder="kilometers"
          type="number"
          control={control}
          error={errors.kilometers}
        />

        <CustomInput
          name="status"
          placeholder="status"
          type="text"
          control={control}
          error={errors.status}
        />
      </div>
      <Controller
        name="engine_id"
        control={control}
        render={({ field }) => (
          <Select
            className={s.selectGroup}
            options={engineState}
            placeholder={"Engine"}
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
      <div className={s.cardBlock}>
        <CustomInput
          name="ownerComment"
          placeholder="ownerComment"
          type="text"
          control={control}
          error={errors.ownerComment}
        />
        <CustomInput
          name="ownerNumbers"
          placeholder="ownerNumbers"
          type="text"
          control={control}
          error={errors.ownerNumbers}
        />
      </div>
      <CustomInput
        name="vinCode"
        placeholder="vinCode"
        type="text"
        control={control}
        error={errors.vinCode}
      />
      <CustomInput
        name="placement"
        placeholder="placement"
        type="text"
        control={control}
        error={errors.placement}
      />
      <div className={s.buttonsBlock}>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          style={{ width: "100%" }}
        >
          Submit
        </Button>
        <Button
          htmlType="reset"
          type="dashed"
          size="large"
          style={{ width: "100%", backgroundColor: "var(--black)", color: "white" }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
