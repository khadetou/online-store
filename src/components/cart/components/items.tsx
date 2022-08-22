import React, { FC, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import { Item, useCart } from "react-use-cart";
import Link from "next/link";

const Items: FC<{
  setValue?: any;
}> = ({ setValue }) => {
  const { items, updateItemQuantity, removeItem, cartTotal } = useCart();
  const [Item, setItem] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(cartTotal);
    setItem(items);
  }, [cartTotal, items]);

  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <Scrollbars autoHide={true} className="scrollbar">
        <ul>
          {Item.map(({ image, name, price, id, quantity }) => (
            <li
              key={id}
              className="flex justify-between group relative items-center px-2"
            >
              <div
                className="absolute right-0 top-0 invisible transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 group-hover:visible cursor-pointer"
                onClick={() => removeItem(id)}
              >
                <IoIosClose className="text-red-500" size="23px" />
              </div>

              <div className=" w-[100px] h-[100px]">
                <Image
                  src={image[0].url}
                  alt="Images preview"
                  layout="responsive"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </div>

              <div className="flex flex-col justify-center mr-1">
                <p className="text-dark-gray text-sm mb-2">{name}</p>
                <div className="rounded-full border flex items-center justify-center border-light-gray">
                  <span
                    className="border-r px-2 border-light-gray cursor-pointer"
                    onClick={() => updateItemQuantity(id, quantity! - 1)}
                  >
                    -
                  </span>
                  <input
                    className="w-[35px] sm:w-14 text-light-gray text-center p-0 text-[14px] focus:ring-0 border-0"
                    type="number"
                    onChange={(e: any) => {
                      updateItemQuantity(id, e.target.value);
                    }}
                    step={1}
                    min={1}
                    value={quantity}
                  />
                  <span
                    className="border-l px-2 border-light-gray cursor-pointer"
                    onClick={() => {
                      updateItemQuantity(id, quantity! + 1);
                    }}
                  >
                    +
                  </span>
                </div>
              </div>
              <h3 className="text-light-gray text-[14px] min-w-[83px]">
                {price.toLocaleString("fr-FR")} FCFA
              </h3>
            </li>
          ))}
        </ul>
      </Scrollbars>
      <div className="border-t-[0.5px] w-full flex flex-col border-light-gray px-5">
        <div className="flex justify-between items-center text-[14px] font-bold h-[4px] mt-6">
          <h3 className="text-dark-gray">SOUS - TOTAL:</h3>
          <h3 className="text-primary">
            {Number(total.toFixed(2)).toLocaleString("fr-FR")} FCFA
          </h3>
        </div>
        <div className="cursor-pointer">
          <Link href="/cart">
            <p className="text-primary text-[14px] uppercase text-center font-semibold mt-3">
              Voire panier
            </p>
          </Link>
        </div>
        <Link href="/cart/shipping">
          <button className="text-white text-[14px] font-bold bg-primary rounded-full py-3 mt-3 transition-all ease-in duration-300 hover:bg-secondary">
            Validation
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Items;
