"use client";
import { useGetAllCarsQuery, useGetMyCarsQuery } from "@/src/api/car";
import { Card, Spin } from "antd";
import { FC } from "react";
import { CarCard } from "../Card/Car";
import { ExICar } from "@/src/api/car/cars.types";
import s from "./styles.module.scss";
import { AppRoutes } from "@/src/constants/constants";
import { useCurrentPathEqual } from "@/src/helpers/pathEqual";

const MapCards: FC = () => {
  const { isEqual } = useCurrentPathEqual(AppRoutes.Profile);
  const { data, isLoading: carsLoading } = isEqual ? useGetMyCarsQuery() : useGetAllCarsQuery();
  const { data: carsData } = data || { data: [] };
  console.log(carsData, isEqual);

  if (carsLoading) return <Spin tip="Loading cars..." />;

  if (carsData)
    return (
      <div className={s.mapContainer}>
        {carsData.map((item: ExICar, id: number) => (
          <CarCard key={id} car={item} isProfile={isEqual} />
        ))}
      </div>
    );
};
export default MapCards;
