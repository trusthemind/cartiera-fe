"use client";
import { useGetCarbyIDQuery } from "@/src/api/car";
import { Card, Spin } from "antd";
import React, { FC } from "react";
import s from "./style.module.scss";
import { SwiperMap } from "../../SwiperMap";
import dayjs from "dayjs";

type ItemProps = {
  id: string;
};

export const ItemPage: FC<ItemProps> = ({ id }) => {
  const { data, isLoading, isError } = useGetCarbyIDQuery(id);
  const { data: CarData, engine: EngineData } = data ?? {};

  const images = CarData?.Photos.split(",") ?? null;

  if (isLoading) return <Spin />;

  if (isError && (!CarData || !EngineData)) return <Spin />;
  return (
    <div className={s.itemContainer}>
      <SwiperMap items={images} />
      <div className={s.infoBlock}>
        <h1>Info</h1>
        <div>
          <h3>
            {CarData?.brand} {CarData?.car_model} <span>{CarData?.year}</span>
          </h3>
          <p>
            Price
            <b>{CarData?.price} $</b>
          </p>
        </div>
      </div>
      <div className={s.infoBlock}>
        <h2>Engine</h2>
        <div>
          <p>
            Brand
            <b>{EngineData?.brand}</b>
          </p>
          <p>
            Name
            <b>{EngineData?.name}</b>
          </p>
          <p>
            Cilinders
            <b>{EngineData?.cilinders}</b>
          </p>
          <p>
            Consumpion
            <b>{EngineData?.consumption}</b>
          </p>
        </div>
      </div>
      {/* <span>{CarData?.placement}</span> */}
      <span className={s.createTimeHolder}>
        Car was opened for sale since {dayjs(CarData?.CreatedAt).format("DD MM YYYY")}
      </span>
    </div>
  );
};
