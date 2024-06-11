import { ExICar } from "@/src/api/car/cars.types";
import { Button, Card, Carousel, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import s from "./style.module.scss";
import { ParseStringToPhoto } from "@/src/helpers/parseStringToPhoto";
import cn from "classnames";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";

export const CarCard: FC<{ car: ExICar; isProfile: boolean }> = ({ car, isProfile }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const images = car.Photos.split(",");
    const photoUrls = images.map((photo) => {
      const url = ParseStringToPhoto(photo);
      console.log("Image URL:", url);
      return url;
    });
    setPhotos(photoUrls);
  }, [car.Photos]);

  return (
    <Card>
      <div className={s.cardContainer}>
        <Carousel
          autoplay
          infinite
          effect="fade"
          fade
          style={{ width: isProfile ? 150 : 250, height: isProfile ? 150 : 250 }}
          dotPosition="left"
        >
          {photos.map((photo: string, index: number) => (
            <Image
              key={index}
              className={s.img}
              alt="car image"
              src={photo}
              width={isProfile ? 150 : 250}
              height={isProfile ? 150 : 250}
              quality={100}
            />
          ))}
        </Carousel>
        <div className={s.infoMore}>
          <div className={s.topHolder}>
            <p className={s.leftText}>
              <b style={{ fontSize: 20, marginLeft: "0.5rem" }}>
                {car.brand} {car.car_model}
              </b>
              <span>VIN: {car.vin_code.replace(/\w{4}$/, "****")}</span>
            </p>
            <b style={{ fontSize: 24 }}>{car.price} $</b>
          </div>
          <div className={cn(s.bottomHolder, { [s.bottomHolderProfile]: isProfile })}>
            {!isProfile && (
              <Card className={s.detailsInfo} styles={{ body: { padding: "1rem" } }}>
                <p>
                  Placement: <span>{car.placement}</span>
                </p>
                <p>
                  Vechicle status: <span>{car.status}</span>
                </p>
                <p>
                  Kilometers: <span>{car.kilometers}</span>
                </p>
              </Card>
            )}
            <div className={s.buttonsControl}>
              <Button type="primary" className={s.moreInfo}>
                <InfoCircleOutlined />
                More
              </Button>
              {isProfile && (
                <Button
                  type="default"
                  className={s.bottomBtn}
                  style={{ color: "var(--error)", border: "1px solid var(--error)" }}
                  onClick={() => {}}
                >
                  <DeleteOutlined />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
