import React, { Dispatch, FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiFilter } from "react-icons/fi";
import StarsRating from "react-star-rate";
import { HiStar } from "react-icons/hi";
import { FaOpencart } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import ProductDrawer from "./drawer/productDrawer";

import ProductItem from "../Modal/productItem";
import { useCart } from "react-use-cart";
import Link from "next/link";
import { RiLuggageCartFill } from "react-icons/ri";

const categories = ["Nut & seed", "Oil", "Fruits", "Tomato", "Soup"];

interface ProductListProps {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  products: any;
  open: any;
  setOpen: any;
}

const ProductsList: FC<ProductListProps> = ({
  openModal,
  setOpenModal,
  products,
  open,
  setOpen,
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [id, setId] = useState("");
  const { inCart, addItem } = useCart();
  const [inCarts, setInCarts] = useState<any>({
    value: (id: any) => false,
  });
  const [categories, setCategories] = useState(products);

  let sets = new Set();
  products.forEach((item: any) => {
    return sets.add(item.category);
  });
  const category = Array.from(sets);

  const filterByCategory = (category: string) => {
    const filetered = products.filter((item: any) => {
      return item.category === category;
    });
    if (category === "") {
      setCategories(products);
    } else {
      setCategories(filetered);
    }
  };

  const filterByPrice = (e: any) => {
    if (e.target.checked) {
      let filtered: any[] = [];
      const priceArr = e.target.name.split("-");
      products.map((product: any) => {
        if (
          product.price >= Number(priceArr[0]) &&
          product.price <= Number(priceArr[1])
        ) {
          return filtered.push(product);
        }
      });

      if (filtered) {
        setCategories(filtered);
      } else {
        setCategories(products);
      }
    } else {
      setCategories(products);
    }
  };

  useEffect(() => {
    setCategories(products);
    setInCarts({
      value: inCart,
    });
  }, [inCart, products]);

  return (
    <section className="mt-4 pb-8">
      <ProductItem
        setOpenModal={setOpenModal}
        openModal={openModal}
        open={open}
        setOpen={setOpen}
        id={id}
      />
      <div className="containers flex flex-col items-center md:items-start md:flex-row">
        <ProductDrawer
          filterByPrice={filterByPrice}
          open={openFilter}
          setOpen={setOpenFilter}
          category={category}
          filterByCategory={filterByCategory}
        />

        <button
          className="flex md:hidden justify-center items-center rounded-md border border-primary hover:bg-primary hover:text-white transition-all ease-in duration-300 text-base w-24 h-9 font-bold mb-7"
          onClick={() => setOpenFilter(true)}
        >
          <FiFilter className="mr-1" />
          Filter
        </button>
        <div className="w-[234px] hidden md:block">
          <div className="mb-10 ">
            <h2 className="mb-5 text-lg text-[#2b2b2b]">Catégories</h2>
            <ul>
              {category.map((item: any, idx: any) => (
                <li
                  className="text-sm text-[#8b8b8b] h-[36px] flex items-center w-full"
                  key={idx}
                >
                  <button onClick={() => filterByCategory(item)}>{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-lg text-[#2b2b2b]">Range Price</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="0 - 6000"
                onChange={filterByPrice}
                className="rounded border-gray-300 text-secondary shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 
                w-[20px]
                h-[20px]
                focus:ring-opacity-50 mr-[8.4px]"
              />
              <label className="text-[#8f8f8f] text-sm">$0.00 - $100.00</label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-0 md:ml-[30px] w-full">
          {categories.map((product: any) => (
            <div key={product._id} className="w-full h-full">
              <div className="w-full group h-full mx-auto max-w-[216px] relative">
                <span
                  className="cursor-pointer p-3 rounded-sm right-0 absolute bg-white z-50 shadow-lg text-[#8f8f8f8f] hover:bg-secondary hover:text-white -translate-y-[150%] group-hover:translate-y-[0%] group-hover:visible group-hover:opacity-100 opacity-0 transition-all ease-linear duration-300 invisible"
                  onClick={() => {
                    setOpenModal(true);
                    setId(product._id);
                  }}
                >
                  <AiOutlineEye />
                </span>
                <div className="w-[166px] h-[166px] cursor-pointer  mx-auto relative">
                  <Link href={`/products/${product._id}`}>
                    <Image
                      alt="image"
                      src={product.image[0].url}
                      layout="fill"
                    />
                  </Link>
                </div>
                <div className="flex flex-col justify-center mb-[30px] px-[15px]">
                  <h2 className="text-center text-[14px] mb-[20px] hover:text-[#A8B324] cursor-pointer">
                    <Link href={`/products/${product._id}`}>
                      {product.name}
                    </Link>
                  </h2>
                  <div className="flex justify-center stars ">
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
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ProductsList;
