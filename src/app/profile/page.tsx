import { ProfileCard } from "@/src/components/ProfileCard";
import { Card, Typography } from "antd";

const ProfilePage = () => {
  return (
    <main>
      <Card>
        <Typography style={{ fontSize: 20, fontWeight: "bold" }}>User Information</Typography>
        <ProfileCard />
        <Typography style={{ fontSize: 20, fontWeight: "bold" }}>My cars</Typography>
      </Card>
    </main>
  );
};

export default ProfilePage;
