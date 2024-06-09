"use client";
import { useGetAllCarsQuery } from "@/src/api/car";
import { Card } from "antd";
import { FC } from "react";
import { CarCard } from "../Card/Car";
import { ExICar } from "@/src/api/car/cars.types";
import s from "./styles.module.scss";

const MapCards: FC = () => {
  const { data, isLoading: carsLoading } = useGetAllCarsQuery();
  const { data: carsData } = data || { data: [] };
  console.log(carsData);
  if (carsData)
    return (
      <div className={s.mapContainer}>
        {carsData.map((item: ExICar) => (
          <CarCard car={item} />
        ))}
      </div>
    );
};
export default MapCards;
