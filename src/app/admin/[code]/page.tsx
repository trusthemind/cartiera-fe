import { EngineTable } from "@/src/components/CarsComponents/Table/Engine";
import { UsersTable } from "@/src/components/CarsComponents/Table/Users";
import { VinCodeForm } from "@/src/components/forms/VinCodeForm";
import { Card, Typography } from "antd";
const AdminPanel = ({ params }: { params: { code: string } }) => {
  return (
    <main>
      <Card styles={{ body: { minHeight: "10rem" } }}>
        Code: {params.code}
        <Typography>Vin Code Checker</Typography>
        <VinCodeForm/>
        <Typography>Engines</Typography>
        <EngineTable />
        <Typography>Users</Typography>
        <UsersTable />
      </Card>
    </main>
  );
};

export default AdminPanel;
