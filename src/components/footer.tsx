import React, { FC } from "react";
import { HiPhone } from "react-icons/hi";
import {
  FaEnvelopeOpenText,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Logo from "/public/images/marchelogo.svg";
import Image from "next/image";

interface FooterProps {
  bgColor?: string;
  textColor?: string;
}

const Footer: FC<FooterProps> = ({ bgColor, textColor }) => {
  return (
    <section className={`${bgColor} bg-white`}>
      <div className="containers">
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b">
          <div className="flex flex-col mb-3 md:mb-0  items-center p-[10px] justify-center md:flex-row">
            <div className="mr-2">
              <HiPhone size={48} className="text-secondary" />
            </div>
            <div className="flex-col flex items-center md:items-start">
              <h3>
                <span
                  className={`${textColor} text-black uppercase tracking-wider font-semibold text-xs`}
                >
                  Appelez Nous 24/7
                </span>
              </h3>
              <p className="text-secondary">(+221) 78 600 45 64</p>
            </div>
          </div>
          <div className="flex flex-col mb-3 items-center justify-center md:flex-row">
            <div className="mr-2 mb-3 md:mb-0">
              <FaEnvelopeOpenText size={48} className="text-secondary" />
            </div>
            <div className="flex-col flex items-center md:items-start">
              <h3
                className={`${textColor}  text-black font-semibold uppercase tracking-wider text-xs`}
              >
                Email Us
              </h3>
              <p
                className={` ${textColor} text-black font-semibold uppercase tracking-wider text-xs`}
              >
                marchesenegal@gmail.com
              </p>
            </div>
          </div>
          <div className="flex flex-col p-[10px] mb-3 md:mb-0 items-center md:items-start">
            <h3
              className={`${textColor} text-black uppercase tracking-wider font-semibold mb-5 text-xs`}
            >
              Follow Us
            </h3>
            <div className="flex text-secondary">
              <FaFacebook className="mr-5" /> <FaYoutube className="mr-5" />
              <FaTwitter className="mr-5" />
              <FaInstagram />
            </div>
          </div>
          <div className="p-[10px] flex flex-col items-center md:flex-row ">
            <div className="w-[302px] relative h-[21px]">
              <Image
                alt="image"
                src="https://res.cloudinary.com/didh3wbru/image/upload/v1658142430/Ecommerce/Images/icons/payment_1_nunp5t.png"
                layout="fill"
              />
            </div>
          </div>
        </div>
        <div className="pt-10 pb-9 border-b">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="flex items-center cursor-pointer ">
              <button className="w-[78px] h-[86px]">
                <Image
                  src={Logo}
                  alt="logo"
                  layout="responsive"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </button>
              <h1 className="text-primary font-light text-xl font-Playfair">
                Marché Sénégal
              </h1>
            </div>
            <div className="pl-[10px] pr-[60px] border-r">
              <h2
                className={`uppercase tracking-wider mb-4 text-xs text-[#2b2b2b] font-bold ${textColor}`}
              >
                Store location
              </h2>
              <p className="text-sm mb-4  text-[#8f8f8f]">
                9066 Green Lake Drive Chevy Chase, MD 20815
              </p>
              <p className="text-sm mb-2 flex flex-col justify-between h-[56px] text-[#8f8f8f] ">
                Lundi - Samedi:
                <span className={`${textColor} text-black`}>08h - 21h</span>
              </p>
              <p className="text-sm flex mb-4 flex-col h-[56px] justify-between text-[#8f8f8f] ">
                Dimanche:
                <span className={`${textColor} text-black`}>09h - 21h</span>
              </p>
            </div>
            <div className="pl-[10px] md:pl-[85px] pr-[10px]">
              <h2
                className={`uppercase tracking-widest mb-4 text-xs text-[#2b2b2b] font-bold ${textColor}`}
              >
                Information
              </h2>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                About us
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Blog
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Checkout
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Contact
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Service
              </p>
            </div>
            <div className="px-[10px]">
              <h2
                className={`uppercase tracking-widest mb-4 text-xs text-[#2b2b2b] font-bold ${textColor}`}
              >
                Mon Profile
              </h2>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Mon Profile
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Contact
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Panier
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Boutique
              </p>
            </div>
            <div className="px-[10px]">
              <h2
                className={`uppercase tracking-widest mb-4 text-xs text-[#2b2b2b] font-bold ${textColor}`}
              >
                Légumes et Fruits
              </h2>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Produits Laitier
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Aliments emballés
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Boissons
              </p>
              <p className="text-sm mb-4 hover:text-secondary  text-[#8f8f8f]">
                Santé et le bien être
              </p>
            </div>
          </div>
        </div>
        <div className="pt-[33px]">
          <p className="text-center text-[14px] text-[#8f8f8f8f] p-[10px]">
            Copyright © 2022 <span className="text-secondary">Hotcodes </span>
            All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
