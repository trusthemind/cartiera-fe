import { ExICar } from "@/src/api/car/cars.types";
import { Card } from "antd";
import { FC, useEffect, useState } from "react";
import Image from "next/image";

export const CarCard: FC<{ car: ExICar }> = ({ car }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const images = car.Photos.split(",");
    const photoUrls = images.map((photo) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${photo.trim()}`;
      console.log('Image URL:', url);
      return url;
    });
    setPhotos(photoUrls);
  }, [car.Photos]);

  console.log(photos)
  return (
    <Card>
      <div>
        {photos.map((photo: string, index: number) => (
          <Image key={index} alt="car image" src={photo} width={100} height={200} />
        ))}
        <div>
          <h4>
            {car.brand} {car.car_model}
          </h4>
          <b>{car.price} $</b>
        </div>
      </div>
    </Card>
  );
};
