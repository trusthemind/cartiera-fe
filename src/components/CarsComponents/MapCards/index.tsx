"use client";
import { useGetAllCarsQuery, useGetMyCarsQuery } from "@/src/api/car";
import { Card, Select, Spin, Typography } from "antd";
import { FC, useState, useEffect } from "react";
import { CarCard } from "../Card/Car";
import { ExICar } from "@/src/api/car/cars.types";
import s from "./styles.module.scss";
import { AppRoutes, CarsBrand } from "@/src/constants/constants";
import { useCurrentPathEqual } from "@/src/helpers/pathEqual";

const MapCards: FC = () => {
  const { isEqual } = useCurrentPathEqual(AppRoutes.Profile);
  const [carBrand, setCarBrand] = useState<string>("");
  const { data, isLoading: carsLoading, refetch } = isEqual
    ? useGetMyCarsQuery()
    : useGetAllCarsQuery(carBrand);

  useEffect(() => {
    if (!isEqual) {
      refetch();
    }
  }, [carBrand, refetch, isEqual]);

  if (carsLoading) return <Spin />;

  const carsData = data?.data || [];

  return (
    <div className={s.mapContainer}>
      {!isEqual && (
        <div>
          <Typography>Car Brand</Typography>
          <Select
            style={{ minWidth: "14rem" }}
            className={s.selectGroup}
            options={CarsBrand}
            placeholder="Brand"
            value={carBrand}
            onChange={(value) => setCarBrand(value)}
          />
        </div>
      )}
      {carsData.map((item: ExICar, id: number) => (
        <CarCard key={id} car={item} isProfile={isEqual} />
      ))}
    </div>
  );
};

export default MapCards;
