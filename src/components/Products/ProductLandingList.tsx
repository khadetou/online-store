import React, { Dispatch, FC, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import StarsRating from "react-star-rate";
import { HiStar } from "react-icons/hi";
import { FaOpencart } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import ProductItem from "../Modal/productItem";
import { useAppSelector } from "@/hooks/index";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { RiLuggageCartFill } from "react-icons/ri";

const categories = ["Nut & seed", "Oil", "Fruits", "Tomato", "Soup"];

interface ProductListProps {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  img: string;
  open: any;
  setOpen: any;
  title: string;
}

const ProductLandingList: FC<ProductListProps> = ({
  openModal,
  setOpenModal,
  img,
  open,
  setOpen,
  title,
}) => {
  const { products } = useAppSelector((state) => state.products);

  const [id, setId] = useState("");

  const { addItem, inCart } = useCart();
  const [inCarts, setInCarts] = useState<any>({
    value: (id: any) => false,
  });

  useEffect(() => {
    setInCarts({
      value: inCart,
    });
  }, [inCart]);

  return (
    <section className="mt-4 mb-8">
      <div className="containers">
        <ProductItem
          open={open}
          setOpen={setOpen}
          openModal={openModal}
          setOpenModal={setOpenModal}
          id={id}
        />
        <div className="p-[30px] w-full flex flex-col lg:flex-row  flex-1 justify-between bg-white rounded-sm">
          <div className="p-0 xs:p-[10px] mx-auto xs:m-0 box-content">
            <div className="flex items-center mb-6">
              <div className="rounded-full w-3 h-3 border border-secondary mr-5" />
              <h2 className="text-[25px] text-primary font-semibold">
                {title}
              </h2>
            </div>
            <div className="w-[179px] xs:w-[244px] h-[318px] relative">
              <Image
                alt="image"
                src={img}
                layout="fill"
                className="rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col self-end w-full max-w-[670px] xl:max-w-[709px] 2xl:max-w-[900px] box-content p-[10px] h-[494px]">
            <ul className="flex flex-wrap xs:flex-nowrap w-full mb-[50px] justify-end">
              {categories.map((items, idx) => (
                <li
                  className="text-xs cursor-pointer  md:last:mr-[30px] text-[#8f8f8f] px-[5px] md:px-[10px] py-[15px] hover:text-[#A8B324]"
                  key={idx}
                >
                  {items}
                </li>
              ))}
            </ul>

            <div>
              <Swiper
                slidesPerView={1}
                breakpoints={{
                  1025: {
                    slidesPerView: 4,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  450: {
                    slidesPerView: 2,
                  },
                }}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="h-full products"
              >
                {products.map((product: any, idx: any) => (
                  <SwiperSlide key={idx} className="w-full h-full">
                    <div className="w-full group h-full mx-auto max-w-[216px] relative">
                      <span
                        className="cursor-pointer p-3 rounded-sm right-0 absolute bg-white z-50 shadow-lg text-[#8f8f8f8f] hover:bg-secondary hover:text-white -translate-y-[150%]  group-hover:translate-y-[0%] transition-all ease-linear duration-300"
                        onClick={() => {
                          setOpenModal(true);
                          setId(product && product._id);
                        }}
                      >
                        <AiOutlineEye />
                      </span>
                      <Link href={`/products/${product._id}`}>
                        <div className="w-[166px] h-[166px] cursor-pointer  mx-auto relative">
                          <Image
                            alt="image"
                            src={product.image[0].url}
                            layout="fill"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col justify-center  px-[15px]">
                        <Link href={`/products/${product._id}`}>
                          <h2 className="text-center text-[14px] mb-[10px] hover:text-[#A8B324] cursor-pointer">
                            {product.name}
                          </h2>
                        </Link>
                        <div className="flex justify-center my-3 stars ">
                          <StarsRating
                            value={product.rating}
                            disabled
                            symbol={<HiStar size="25px" />}
                            classNamePrefix="stars"
                          />
                        </div>
                        <h2 className="text-center text-[#A8B324] font-bold text-base">
                          {product.price.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "XOF",
                            currencyDisplay: "narrowSymbol",
                          })}
                        </h2>
                        <button
                          className="bg-primary rounded-full flex justify-center items-center w-[165px] mx-auto mt-4 text-white text-[14px] px-[5px] py-[9px] font-normal"
                          onClick={() => {
                            addItem({ ...product, id: product._id });
                            setOpen(true);
                          }}
                        >
                          <FaOpencart className="mr-1" />
                          Ajouter au panier
                        </button>
                        {inCarts.value(product._id) && (
                          <Link href="/cart">
                            <button className="bg-primary  rounded-full flex justify-center items-center w-[165px] mx-auto mt-4 text-white text-[14px] px-[5px] py-[9px] font-normal">
                              <RiLuggageCartFill className="mr-1" />
                              Voire le panier
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLandingList;
