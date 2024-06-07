import { ICar } from "@/src/api/car/cars.types";
import { Card } from "antd";
import { FC } from "react";

export const CarCard: FC<ICar> = ({
  owner_comment,
  year,
  owners_number,
  placement,
  price,
  kilometers: km,
  brand,
  status,
  engine_id,
  car_model,
  vin_code,
}) => {
  return <Card>
    
  </Card>;
};
