import { ItemPage } from "@/src/components/CarsComponents/ItemPage";
import { Card } from "antd";
import { FC } from "react";

type CarParams = {
  params: { id: string };
};

const CarIdPage: FC<CarParams> = ({ params }) => {
  const { id } = params;
  return (
    <main>
      <Card>
        <ItemPage id={id} />
      </Card>
    </main>
  );
};

export default CarIdPage;
