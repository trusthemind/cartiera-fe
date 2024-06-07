import s from "./page.module.scss";
import { EngineForm } from "../components/forms/EngineForm";
import { Typography } from "antd";

export default function Home() {
  return (
    <main className={s.main}>
      <Typography
        style={{ color: "white", fontStyle: "italic", fontSize: 36, textAlign: "center" }}
      >
        FE of Cartiera
      </Typography>
    </main>
  );
}
