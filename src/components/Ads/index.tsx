import React from "react";
import Card from "./Card";

const Ads = () => {
  const cardList = [
    {
      img: "https://res.cloudinary.com/didh3wbru/image/upload/v1658004703/Ecommerce/Images/offer%20images/h1-banner-1-ok2_g8eavo.jpg",
      title: "Découvrir Real Organic Saveurs",
    },
    {
      img: "https://res.cloudinary.com/didh3wbru/image/upload/v1658004650/Ecommerce/Images/offer%20images/h1-banner-3-ok_s0idsb.jpg",
      title: "Meilleur miel avec Premium Qualité",
    },
    {
      img: "https://res.cloudinary.com/didh3wbru/image/upload/v1658004693/Ecommerce/Images/offer%20images/h1-banner-2-ok_sqeoii.jpg",
      title: "Désintoxication avec Légumes verts et Fruits",
    },
  ];

  return (
    <section className="bg-bg-color h-full p-[10px] ">
      <div className="containers">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardList.map(({ img, title }, idx) => (
            <Card key={idx} img={img} title={title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ads;
