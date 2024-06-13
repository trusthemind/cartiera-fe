import s from "./page.module.scss";
import { EngineForm } from "../components/forms/EngineForm";
import { Card, Typography } from "antd";
import Image from "next/image";
import img from "@/assets/images/model_1.svg";
import market from "@/assets/images/porche_market.jpg";

export default function Home() {
  return (
    <main className={s.main}>
      <Image quality={100} src={img} alt="image" className={s.car} />
      <Card styles={{ body: { minHeight: "20rem" } }}>
        <Typography style={{ fontSize: 36, textAlign: "center" }}>Welcome to Cartiera</Typography>
        <div className={s.dreamCar}>
          <Image
            quality={100}
            src={market}
            alt="car-market"
            width={850}
            style={{ borderRadius: 16 }}
          />
          <Card>
            <Typography style={{ fontSize: 24 }}>Find Your Dream Ride</Typography> Cartiera puts the
            power of car buying in your hands. Explore our extensive inventory, compare features,
            and find the perfect car for your needs and lifestyle - all from the comfort of your
            phone or computer.
          </Card>
        </div>
        <div className={s.About}></div>
      </Card>
    </main>
  );
}
