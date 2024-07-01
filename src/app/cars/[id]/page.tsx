import { Card } from "antd";
import { FC } from "react";

type CarParams = {
  params: { id: string };
};

const CarIdPage: FC<CarParams> = ({ params }) => {
  const { id } = params;
  return <Card styles={{ body: { minHeight: "10rem" } }}>this is car id page {id}</Card>;
};

export default CarIdPage;
