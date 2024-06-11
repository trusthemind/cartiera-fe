import s from "./page.module.scss";
import { EngineForm } from "../components/forms/EngineForm";
import { Card, Typography } from "antd";

export default function Home() {
  return (
    <main className={s.main}>
      <Card styles={{ body: { minHeight: "20rem" } }}>
        <Typography style={{ fontStyle: "italic", fontSize: 36, textAlign: "center" }}>
          Welcome to Cartiera
        </Typography>
      </Card>
    </main>
  );
}
