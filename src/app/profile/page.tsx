"use client";
import { Logout } from "@/src/helpers/logout";
import { useAppSelector } from "@/src/redux/hooks";
import { Button, Card } from "antd";

const ProfilePage = () => {
  const { username } = useAppSelector((s) => s.auth);
  return (
    <main>
      <Card
        styles={{
          body: {
            minHeight: "10rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          },
        }}
      >
        {username}
        <Button
          onClick={Logout}
          type="primary"
          style={{
            minWidth: "6rem",
            color: "var(--primary-dark)",
          }}
        >
          {"Logout"}
        </Button>
      </Card>
    </main>
  );
};

export default ProfilePage;
