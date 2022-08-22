import React from "react";
import Image from "next/image";

const AboutScreen = () => {
  const List = [
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434102/Ecommerce/Images/About/about1_bkbhkh.jpg",
      h1: " Qui Sommes Nous",
      p: " Donec accumsan auctor iaculis. Sed suscipit arcu ligula, ategestas magna molestie a. Proin ac ex maximus, ultrices justoeget, sodales orci.",
    },
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434103/Ecommerce/Images/About/about2_zxjtp4.jpg",
      h1: "Nos Produits",
      p: " Donec accumsan auctor iaculis. Sed suscipit arcu ligula, ategestas magna molestie a. Proin ac ex maximus, ultrices justoeget, sodales orci.",
    },
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434103/Ecommerce/Images/About/about3_rnch5d.jpg",
      h1: "Comment Nous Travaillons",
      p: " Donec accumsan auctor iaculis. Sed suscipit arcu ligula, ategestas magna molestie a. Proin ac ex maximus, ultrices justoeget, sodales orci.",
    },
  ];

  const qualite1 = [
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658433942/Ecommerce/Images/About/feature-1_conktx.png",
      h3: "Fait à la main",
      p: "Made with passion by 300+ curators across the country.",
    },
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434000/Ecommerce/Images/About/feature-2_batdmf.png",
      h3: "100% Natural ",
      p: "Manger local, consommer local, plus proche de la nature.",
    },
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434043/Ecommerce/Images/About/feature-3_aegake.png",
      h3: "Produits Crée",
      p: "Made with passion by 300+ curators across the country.",
    },
  ];

  const team = [
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434102/Ecommerce/Images/About/testimonial-about1_s6qptw.jpg",
      h3: "Khadetou Dianifabe",
      p: "Founder",
    },
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434102/Ecommerce/Images/About/testimonial-about3_kyqsv8.jpg",
      h3: "Khadetou Dianifabe",
      p: "Founder",
    },
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434102/Ecommerce/Images/About/testimonial-about4_pengbm.jpg",
      h3: "Khadetou Dianifabe",
      p: "Founder",
    },
    {
      src: "https://res.cloudinary.com/didh3wbru/image/upload/v1658434102/Ecommerce/Images/About/testimonial-about2_yo4im6.jpg",
      h3: "Khadetou Dianifabe",
      p: "Founder",
    },
  ];
  return (
    <section className="mb-28">
      <div className="containers mb-12">
        <div className="flex justify-between flex-col sm:flex-row">
          {List.map(({ h1, p, src }, idx) => (
            <div key={idx} className="w-full max-w-[400px] p-[10px]">
              <div className="relative w-full transition-all duration-300 ease-in hover:scale-90">
                <Image
                  src={src}
                  alt="images"
                  layout="responsive"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </div>
              <div>
                <h1 className="text-primary text-[22px] font-semibold text-center my-[20px]">
                  {h1}
                </h1>
                <p className="text-center text-sm leading-[1.6] text-gray-600">
                  {p}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[50px] p-[10px">
          <h3 className="mb-[10px] text-secondary font-Playfair text-lg font-bold text-center">
            Nos Produits
          </h3>
          <h1 className="text-primary text-[40px] font-medium text-center">
            Meilleur Qualité
          </h1>
          <div className="w-full flex flex-col justify-between  sm:flex-row ">
            <div className="flex flex-col">
              {qualite1.map(({ h3, p, src }, idx) => (
                <div
                  key={idx}
                  className="w-full flex  items-center  max-w-[400px]"
                >
                  <div className="w-32 h-28 mr-1  p-[10px]">
                    <Image
                      alt="images image"
                      src={src}
                      width={120}
                      height={118}
                    />
                  </div>
                  <div>
                    <h3 className="text-base text-primary mb-1 font-semibold">
                      {h3}
                    </h3>
                    <p className="text-gray-400 text-sm leading-[2]">{p}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center items-center max-w-[400px]">
              <Image
                alt="images"
                src="https://res.cloudinary.com/didh3wbru/image/upload/v1658434076/Ecommerce/Images/About/layer-40-370x257-1_hhxex9.png"
                width={370}
                height={257}
              />
            </div>
            <div className="flex flex-col-reverse">
              {qualite1.map(({ h3, p, src }, idx) => (
                <div
                  key={idx}
                  className="w-full flex  items-center max-w-[400px]"
                >
                  <div className="w-32 h-28 mr-1 p-[10px]">
                    <Image alt="images" src={src} width={120} height={118} />
                  </div>
                  <div>
                    <h3 className="text-base text-primary mb-1 font-semibold">
                      {h3}
                    </h3>
                    <p className="text-gray-400 text-sm leading-[2]">{p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('https://res.cloudinary.com/didh3wbru/image/upload/v1658434102/Ecommerce/Images/About/bg-testimonial_bqhki2.jpg')]  min-h-[450px] flex items-center justify-center">
        <div className="w-full flex flex-col items-center max-w-[500px]">
          <p className="text-center text-lg mb-5 p-[10px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <div className="w-[60px] h-[60px] mb-5 relative">
            <Image
              alt="images"
              src="https://res.cloudinary.com/didh3wbru/image/upload/v1658434102/Ecommerce/Images/About/testimonial-2_qwk3c0.png"
              layout="fill"
            />
          </div>
          <p className="text-center text-sm mb-1 text-gray-500">
            Khadetou Dianifabe
          </p>
          <p className="text-center text-[11px] text-gray-500">Developer</p>
        </div>
      </div>
      <div className="containers mt-20">
        <div>
          <h3 className="mb-[10px] text-secondary font-Playfair text-lg font-bold text-center">
            Our Team
          </h3>
          <h1 className="text-primary text-[40px] font-medium text-center">
            Meilleur Equipe
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
          {team.map(({ h3, p, src }, idx) => (
            <div key={idx} className="max-w-[280px] justify-self-center">
              <div className="w-[280px] mt-7 h-[336px] relative ">
                <Image
                  alt="image"
                  src={src}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#00000050] opacity-0 hover:opacity-100 transition-all duration-500 ease-in-out rounded-lg"></div>
              </div>
              <h1 className="text-lg text-primary font-normal text-center mt-4">
                {h3}
              </h1>
              <p className="text-sm text-gray-500 text-center mt-1">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutScreen;
