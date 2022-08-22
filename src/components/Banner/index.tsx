import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "https://res.cloudinary.com/didh3wbru/image/upload/v1657993542/Ecommerce/Images/Banner%20Images/slider-1_ecuggp.jpg",
    title: "vegetables slide",
    h1: "Ou vous pouvez achetez",
    p: "Bienvenue à marché Sénégal",
    button: "Découvrir Nos Produits",
  },
  {
    src: "https://res.cloudinary.com/didh3wbru/image/upload/v1657993545/Ecommerce/Images/Banner%20Images/slider-2_dqcyyd.jpg",
    title: "tomatoes slide",
    h1: "Meilleur Qualité",
    p: "Produits locale de",
    button: "Voire Plus",
  },
];

const Banner = () => (
  <section className="h-[500px] lg:h-[680px] w-full">
    <div className="h-full w-full">
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        className="h-full banner"
      >
        {images.map(({ button, h1, p, src, title }, idx) => (
          <SwiperSlide
            key={idx}
            className="w-full h-full text-center flex justify-center items-center"
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full">
                <Image
                  src={src}
                  alt={title}
                  objectFit="cover"
                  objectPosition={5}
                  layout="fill"
                />
              </div>
              <div className="absolute z-50 left-[50%] -translate-x-1/2 lg:left-[30%] top-[50%] -translate-y-1/2 max-w-[440px] ">
                <h2 className="mb-[40px] text-lg font-normal text-primary">
                  {p}
                </h2>
                <h1 className=" text-[50px] md:text-[60px] lg:text-[80px] mb-[40px] text-primary font-CaveatBrush leading-[1.2]">
                  {h1}
                </h1>
                <Link href="/products">
                  <button className="text-xs md:text-sm rounded-full py-[10px] px-[30px] text-white bg-primary transition-all duration-200 ease-out hover:bg-white hover:text-primary leading-[1.4]">
                    {button}
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div></div>
  </section>
);

export default Banner;
