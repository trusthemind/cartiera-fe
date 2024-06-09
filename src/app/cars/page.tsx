import MapCards from "@/src/components/CarsComponents/MapCards";
import { AppRoutes } from "@/src/constants/constants";
import { PlusOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Link from "next/link";

const CarsPage = () => {
  return (
    <main>
      <Card styles={{ body: { minHeight: "20rem" } }}>
        <Link
          href={AppRoutes.CreateCar}
          style={{ color: "var(--purple)", display: "flex", gap: "0.25rem", justifyContent: "end" }}
        >
          <PlusOutlined />
          Add
        </Link>
        <MapCards/>
      </Card>
    </main>
  );
};

export default CarsPage;
