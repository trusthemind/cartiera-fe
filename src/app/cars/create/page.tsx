import { CreateCarForm } from "@/src/components/forms/CreateCarForm";
import { Card } from "antd";
import { FC } from "react";

const CarCreatePage: FC = () => {
  return (
    <main>
      <Card>
        <CreateCarForm />
      </Card>
    </main>
  );
};
export default CarCreatePage;
