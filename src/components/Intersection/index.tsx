import React from "react";
import Image from "next/image";
import { BiChevronsRight } from "react-icons/bi";

const Intersection = () => {
  return (
    <section className="w-full  mb-10">
      <div className="containers px-5 md:px-0 h-full flex flex-col sm:flex-row lg:justify-between">
        <div className="h-[270px]  w-full relative max-w-[710px] mb-5 md:mb-0 ">
          <div className="relative w-full h-full">
            <Image
              alt="image"
              src="https://res.cloudinary.com/didh3wbru/image/upload/v1657993550/Ecommerce/Images/Banner%20Images/h1-banner-8-ok1_egztvk.jpg"
              layout="fill"
            />
          </div>
          <div className="absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2">
            <h2 className="text-center text-primary text-[30px]">
              Organic Ingredients Made Easy
            </h2>
            <button className="underline flex items-center mx-auto text-[12px]">
              shop online <BiChevronsRight />
            </button>
          </div>
        </div>
        <div className="h-[270px] w-full relative max-w-[464px]">
          <div className="relative w-full h-full">
            <Image
              alt="image"
              src="https://res.cloudinary.com/didh3wbru/image/upload/v1658088150/Ecommerce/Images/Banner%20Images/h1-banner-9-ok_1_rdu4sp.jpg"
              layout="fill"
            />
          </div>
          <div className="absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2">
            <h2 className="text-center text-primary text-[30px]">
              Organic Ingredients Made Easy
            </h2>
            <button className="underline flex items-center mx-auto text-[12px]">
              shop online <BiChevronsRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intersection;
