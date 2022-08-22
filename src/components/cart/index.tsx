import React, { FC, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaOpencart } from "react-icons/fa";
import Image from "next/image";
import { Item, useCart } from "react-use-cart";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "@/hooks/index";

const CartItems: FC<{ open: any; setOpen: any }> = ({ open, setOpen }) => {
  const [qty, setQty] = useState(1);
  const { items, isEmpty, removeItem, updateItemQuantity, cartTotal } =
    useCart();
  const [empty, setEmpty] = useState(false);
  const [total, setTotal] = useState(0);
  const [Items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    setEmpty(isEmpty);
    setTotal(cartTotal);
    setItems(items);
  }, [cartTotal, isEmpty, items]);

  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <section className="w-full h-full flex flex-col justify-between mb-28 ">
      <div className="containers">
        {empty ? (
          <div>
            <div className="text-white mb-1 flex items-center bg-primary p-3 w-full">
              <FaOpencart className="mr-4" /> <p>Votre panier est vide</p>
            </div>
            <Link href="/">
              <button className="text-white rounded-full bg-primary px-14 py-3 mt-9 hover:bg-secondary">
                Retourner
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center lg:items-start lg:flex-row justify-center lg:justify-between">
            {/* computer screen */}
            <div className="w-full hidden lg:flex flex-col items-center">
              <table>
                <thead>
                  <tr>
                    <th className="w-10 border-b border-[#ddd] py-[30px] text-dark-gray">
                      &nbsp;
                    </th>
                    <th className="w-[70px] min-w-[70px] border-b border-[#ddd]  py-[30px] text-dark-gray">
                      &nbsp;
                    </th>
                    <th className="px-5 font-semibold min-w-[137px] border-b border-[#ddd] py-[30px] text-dark-gray text-sm text-start">
                      Produit
                    </th>
                    <th className="px-5 border-b border-[#ddd] py-[30px] text-dark-gray min-w-[143px] text-start font-semibold text-sm">
                      Prix
                    </th>
                    <th className="px-5  border-b min-w-[228px] border-[#ddd] py-[30px] text-dark-gray font-semibold text-sm text-center">
                      Quantité
                    </th>
                    <th className=" min-w-[143px] text-end border-b border-[#ddd] py-[30px] text-dark-gray font-semibold text-sm">
                      Sous Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Items.map(({ id, price, image, name, quantity }) => (
                    <tr key={id}>
                      <td className="py-[30px] pb-[40px] border-b border-[#ddd]">
                        <div
                          className="  transition-all duration-300 ease-out cursor-pointer mr-0 lg:mr-5"
                          onClick={() => removeItem(id)}
                        >
                          <IoIosClose
                            size="25px"
                            className="text-[#8f8f8f] hover:text-red-600"
                          />
                        </div>
                      </td>
                      <td className="py-[30px] pb-[40px] border-b border-[#ddd]">
                        <div className="flex items-center">
                          <Image
                            alt="product"
                            src={image[1].url}
                            width={75}
                            height={75}
                          />
                        </div>
                      </td>
                      <td className="py-[30px] pb-[40px] px-[20px] border-b border-[#ddd] cursor-pointer">
                        <p className="text-gray-400 lg:text-dark-gray font-semibold text-sm hover:text-secondary">
                          {name}
                        </p>
                      </td>
                      <td className="py-[30px] pb-[40px] px-[20px] border-b border-[#ddd] cursor-pointer">
                        <h3 className="text-light-gray text-[14px]">
                          {price.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "CFA",
                            // currencyDisplay: "narrawSymbol",
                          })}
                        </h3>
                      </td>
                      <td className="py-[30px] pb-[40px] px-[20px] border-b border-[#ddd] cursor-pointer">
                        <div className="rounded-full w-[120px] border py-0 lg:py-3 items-center mx-auto border-gray-200">
                          <span
                            className=" px-2 text-gray-500 border-light-gray cursor-pointer"
                            onClick={() => {
                              updateItemQuantity(id, quantity! - 1);
                            }}
                          >
                            -
                          </span>
                          <input
                            className="w-14 p-0 text-dark-gray text-center border-0 text-[14px]"
                            type="number"
                            step={1}
                            min={1}
                            value={quantity}
                            onChange={(e: any) => {
                              setQty(e.target.value);
                              updateItemQuantity(id, quantity! + qty);
                            }}
                          />
                          <span
                            className=" px-2 text-gray-500 border-light-gray cursor-pointer"
                            onClick={() => {
                              updateItemQuantity(id, quantity! + 1);
                            }}
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td className="py-[30px] pb-[40px] text-end border-b border-[#ddd] cursor-pointer">
                        <h3 className="text-primary font-medium text-[14px]">
                          {(quantity! * price).toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "CFA",
                            // currencyDisplay: "narrawSymbol",
                          })}
                        </h3>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* mobile screen */}
            <div className="w-full lg:hidden">
              {Items.map(({ id, image, quantity, name, price }) => (
                <div key={id} className="border-b border-[#ddd] w-full">
                  <div className="flex w-full">
                    <div className="mr-2">
                      <Image
                        alt="product"
                        src={image[1].url}
                        width={75}
                        height={75}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between border-dashed border-b py-3 border-[#ddd] ">
                        <h3 className="text-sm text-dark-gray font-bold ">
                          {name}
                        </h3>
                        <div onClick={() => removeItem(id)}>
                          <IoIosClose size="25px" className=" text-red-600" />
                        </div>
                      </div>
                      <div className="flex justify-between py-3 text-sm  border-dashed border-b border-[#ddd] ">
                        <h3 className="text-sm">price</h3>
                        <div>
                          <p>
                            {price.toLocaleString("fr-FR", {
                              style: "currency",
                              currency: "CFA",
                              // currencyDisplay: "narrawSymbol",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm py-3 border-dashed border-b border-[#ddd] ">
                        <h3 className="text-sm flex items-center mr-3">
                          Quantité
                        </h3>
                        <div className="rounded-full w-[110px] border py-1 items-center border-gray-200">
                          <span
                            className=" px-2 text-gray-500 border-light-gray cursor-pointer"
                            onClick={() => {
                              updateItemQuantity(id, quantity! - 1);
                            }}
                          >
                            -
                          </span>
                          <input
                            className="w-14 p-0 text-dark-gray text-center border-0 text-[14px]"
                            type="number"
                            step={1}
                            min={1}
                            value={quantity}
                            onChange={(e: any) => {
                              setQty(e.target.value);
                              updateItemQuantity(id, quantity! + qty);
                            }}
                          />
                          <span
                            className=" px-2 text-gray-500 border-light-gray cursor-pointer"
                            onClick={() => {
                              updateItemQuantity(id, quantity! + 1);
                            }}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between py-3">
                        <h3 className="text-sm">Sous Total</h3>
                        <div>
                          <p className="text-sm">
                            {(quantity! * price).toLocaleString("fr-FR", {
                              style: "currency",
                              currency: "CFA",
                              // currencyDisplay: "narrawSymbol",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* cart total */}
            <div className="max-w-[369px] mt-10 lg:mt-0 w-full h-[284px] border border-gray-300 px-[20px] py-[20px] flex flex-col">
              <h1 className="text-[24px] font-normal text-dark-gray my-[15px]">
                Cart totals
              </h1>
              <div className="border-b  flex items-center justify-between">
                <h1 className="text-dark-gray font-bold text-sm py-[10px]">
                  Subtotal
                </h1>
                <p className="text-primary py-[10px] text-sm font-normal">
                  {total.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "CFA",
                    // currencyDisplay: "narrawSymbol",
                  })}
                </p>
              </div>
              <div className=" flex items-center justify-between">
                <h1 className="text-dark-gray font-semibold text-sm pb-[10px] pt-[20px]">
                  Total
                </h1>
                <h1 className="text-primary text-sm font-semibold pb-[10px] pt-[20px]">
                  {total.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "CFA",
                    // currencyDisplay: "narrawSymbol",
                  })}
                </h1>
              </div>
              <Link
                href={{
                  pathname: isAuthenticated ? "/cart/shipping" : "/login",
                  query: !isAuthenticated
                    ? { from: `${router.pathname}/shipping` }
                    : "",
                }}
              >
                <button className="text-white text-sm font-semibold rounded-full mt-5 py-4 bg-primary hover:bg-secondary">
                  PASSER A LA CAISSE
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartItems;
