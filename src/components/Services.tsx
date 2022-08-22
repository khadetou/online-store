import React from "react";
import Image from "next/image";

const icons = [
  {
    img: "https://res.cloudinary.com/didh3wbru/image/upload/v1658135368/Ecommerce/Images/icons/icon-2_volxfr.jpg",
    title: "Handmade",
    p: "made with passion by 300+ customers",
  },
  {
    img: "https://res.cloudinary.com/didh3wbru/image/upload/v1658135368/Ecommerce/Images/icons/icon-3_znzqj5.jpg",
    title: "100% Natural",
    p: "Eat lacal, consume local, closer to nature",
  },
  {
    img: "https://res.cloudinary.com/didh3wbru/image/upload/v1658135368/Ecommerce/Images/icons/icon-40ok_blzwna.jpg",
    title: "Shipping",
    p: "Across All Senegal",
  },
  {
    img: "https://res.cloudinary.com/didh3wbru/image/upload/v1658135368/Ecommerce/Images/icons/icon-5_slq9h0.jpg",
    title: "Save Money",
    p: "At lowest price",
  },
];
const Services = () => {
  return (
    <section className="mb-10">
      <div className="containers">
        <div className="p-[30px] bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {icons.map(({ img, title, p }, idx) => (
            <div key={idx} className="flex items-center p-[10px]">
              <div className="w-[71px] h-[77px] relative mr-2">
                <Image alt="image" src={img} layout="fill" />
              </div>
              <div className="w-[173px]">
                <h2 className="text-base text-primary font-semibold">
                  {title}
                </h2>
                <p className="text-[13px] text-[#555555]">{p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
