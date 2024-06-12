import { EngineTable } from "@/src/components/CarsComponents/Table/Engine";
import { UsersTable } from "@/src/components/CarsComponents/Table/Users";
import { Card, Typography } from "antd";
const AdminPanel = ({ params }: { params: { code: string } }) => {
  return (
    <main>
      <Card styles={{ body: { minHeight: "10rem" } }}>
        Code: {params.code}
        <Typography>Engines</Typography>
        <EngineTable />
        <Typography>Users</Typography>
        <UsersTable />
      </Card>
    </main>
  );
};

export default AdminPanel;
