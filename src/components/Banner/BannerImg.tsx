import React from "react";
import { useRouter } from "next/router";

const BannerImg = () => {
  const router = useRouter();

  return (
    <section className="pt-[80px] pb-[80px] mb-[50px] bg-[#f2f2f2] bg-auto bg-no-repeat bg-center bg-scroll bg-[url('https://res.cloudinary.com/didh3wbru/image/upload/v1658169613/Ecommerce/Images/Banner%20Images/breadcrumb_bz7j6n.jpg')]">
      <div className="containers">
        <h1 className="text-primary text-[2rem] font-normal">Boutique</h1>
        <div>
          <h3 className="text-[#606060] text-[14px]">Accueil {router.route}</h3>
        </div>
      </div>
    </section>
  );
};

export default BannerImg;
