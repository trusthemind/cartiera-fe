import s from "./page.module.scss";
import { Card, Collapse, Typography } from "antd";
import Image from "next/image";
import img from "@/assets/images/model_1.svg";
import market from "@/assets/images/digit-market.jpg";
import deal from "@/assets/images/car-deal.jpg";
import { FAQList } from "../constants/FAQ";

export default function Home() {
  return (
    <main className={s.main}>
      <Image id="car_image" quality={100} src={img} priority alt="car" className={s.car} />
      <Card styles={{ body: { minHeight: "20rem" } }} className={s.mainCard}>
        <Typography data-testid="entryText" style={{ fontSize: 36, textAlign: "center" }}>
          Welcome to Cartiera
        </Typography>
        <div className={s.block_reverse} data-testid="block">
          <Image src={deal} priority className={s.img} alt="deal with new customer car" />
          <p>
            At Cartiera, we make finding your dream car effortless and enjoyable. Our extensive
            inventory and user-friendly platform provide you with all the tools you need to make an
            informed decision. Browse through the latest models, compare features, and find the
            perfect car for your lifestyle and budget—all from the comfort of your home.
          </p>
        </div>
        <div className={s.block} data-testid="block">
          <Image src={market} className={s.img} alt="digit market" />
          <p>
            Cartiera was founded with the mission to revolutionize the car buying experience. We
            understand that purchasing a car is a significant investment, and our goal is to make
            this process as transparent and stress-free as possible. Our team of experts is
            dedicated to providing you with detailed information, high-quality images, and a
            seamless browsing experience. Trust Cartiera to help you find the car that fits your
            needs.
          </p>
        </div>
        <div className={""}>
          <Collapse
            data-test={"accordion"}
            accordion
            items={FAQList}
            expandIconPosition="end"
            ghost
          />
        </div>
        {/* <div className={s.dreamCar}>
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
        </div> */}
      </Card>
    </main>
  );
}
