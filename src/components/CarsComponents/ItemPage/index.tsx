"use client";
import { useGetCarbyIDQuery } from "@/src/api/car";
import { Card, Spin, Skeleton } from "antd";
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

  // if (isLoading) return <Spin />;

  if (isError && (!CarData || !EngineData)) return <Spin />;
  return (
    <>
      <Skeleton
        active
        loading={isLoading}
        paragraph={false}
        title={{ style: { alignSelf: "center", marginBottom: "2rem" } }}
      >
        <div className={s.itemHeader}>
          <h1>{`${CarData?.brand} ${CarData?.car_model} ${CarData?.year}`}</h1>
          <span>created: {dayjs(CarData?.CreatedAt).format("MM/DD/YYYY")}</span>
        </div>
      </Skeleton>
      <div className={s.itemContainer}>
        <Skeleton
          active
          style={{ gridArea: "1 / 1 / 2 / 3" }}
          loading={isLoading}
          paragraph={false}
          title={{ style: { minHeight: "24rem" } }}
        >
          <div className={s.images}>
            <SwiperMap items={images} />
          </div>
        </Skeleton>
        <div className={s.mainInfo}>main</div>
        <div className={s.secondaryInfo}>secondary</div>
        <div className={s.sellerInfo}>seller</div>
      </div>
    </>
  );
};
