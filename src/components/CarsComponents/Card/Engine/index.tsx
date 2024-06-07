import { IEngine } from "@/src/api/engines/engines.types";
import { Card } from "antd";
import { FC } from "react";

export const EngineCar: FC<IEngine> = ({ brand, cilinders, consumption, fuel, name }) => {
  return <Card></Card>;
};
