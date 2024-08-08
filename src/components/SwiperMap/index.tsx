import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { ParseStringToPhoto } from "@/src/helpers/parseStringToPhoto";
import Image from "next/image";
import s from "./style.module.scss";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";

type Props = {
  items: string[] | null;
};

export const SwiperMap: FC<Props> = ({ items }) => {
  return (
    items && (
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#6545c3",
            "--swiper-pagination-color": "#6545c3",
          } as any
        }
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className={s.swiperWrapper}
        spaceBetween={36}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination]}
      >
        {items?.map((image, index) => (
          <SwiperSlide className={s.swiperSlide} key={index}>
            <Image fill src={ParseStringToPhoto(image)} loading="eager" alt="photo" />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
};
