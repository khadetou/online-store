import React, { FC } from "react";
import Image from "next/image";
import { FiChevronsRight } from "react-icons/fi";

interface CardProps {
  img: string;
  title: string;
}

const Card: FC<CardProps> = ({ img, title }) => {
  return (
    <div className="mt-[15px] ">
      <div className="pt-[7%] pl-[10%]  pb-[12%] pr-[10%] w-full h-[280px] relative">
        <div className="w-full h-full ">
          <Image
            alt="Ads"
            src={img}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="absolute top-[50%] -translate-y-1/2 w-[200px] sm:w-[303px]">
          <h2 className="text-primary w-[218px] text-[26px] font-normal leading-[1.4] mb-[20px]">
            {title}
          </h2>
          <div className="flex items-center">
            <button className="text-[12px] text-black underline">
              Achetez maintenant
            </button>
            <FiChevronsRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
