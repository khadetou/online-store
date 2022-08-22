import React, { useEffect } from "react";
import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import order, { getMyOrders } from "store/reducers/order/index";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";

const ProfileScreen = () => {
  const theader = ["ID", "Image", "Date", "Totale", "Payé", "Livré", "Action"];

  const dispatch = useAppDispatch();
  const { isError, message, orders } = useAppSelector((store) => store.orders);
  useEffect(() => {
    dispatch(getMyOrders());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  return (
    <section className="mb-28">
      <div className="containers">
        <Link href="/profile/edit">
          <button className="mb-8 text-white font-bold text-sm uppercase bg-primary hover:bg-secondary px-7 py-3 rounded-md">
            Modifier Mon Profile
          </button>
        </Link>

        <h1 className="text-[25px] text-dark-gray mb-10">Mes Commandes</h1>
        <div className="overflow-auto rounded-lg shadow-md">
          {orders && orders.length !== 0 ? (
            <table className=" w-full ">
              <thead className="bg-gray-50 border-b-2 table-auto border-gray-200">
                <tr>
                  {theader.map((item, idx) => (
                    <th
                      key={idx}
                      className="p-4 text-center  text-sm font-semibold tracking-wide text-[#2b2b2b]"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order: any) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b border-gray-200 even:bg-gray-50"
                    >
                      <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                        <div>{order._id}</div>
                      </td>

                      <td className="p-4 min-w-[94px] text-center text-sm flex  text-[#8f8f8f]">
                        {order.orderItems.map((item: any) => (
                          <div
                            key={item._id}
                            className="text-xs py-2 mx-auto text-white w-[46px]"
                          >
                            <Image
                              alt="image"
                              src={item.image[0].url}
                              width="100%"
                              height="100%"
                              layout="responsive"
                              objectFit="contain"
                            />
                          </div>
                        ))}
                      </td>
                      <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                        <div>{order.createdAt}</div>
                      </td>
                      <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                        <div>{order.totalPrice} FCFA</div>
                      </td>
                      <td className="p-4 min-w-[94px] text-center text-sm  ">
                        {!order.isPaid ? (
                          <div className="flex justify-center items-center">
                            <IoClose className="!text-white bg-red-600  text-[25px] rounded-md" />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center">
                            <BsCheck className="text-white bg-green-600 text-[25px]  rounded-md" />
                          </div>
                        )}
                      </td>
                      <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                        {order.isShipped ? (
                          <div className="flex justify-center items-center">
                            <BsCheck className="text-white bg-green-600 text-[25px]  rounded-md" />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center">
                            <IoClose className="!text-white bg-red-600  text-[25px] rounded-md" />
                          </div>
                        )}
                      </td>
                      <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                        <Link href={`/order/${order._id}`}>
                          <button className="w-full h-full flex justify-around items-center bg-white shadow-md text-dark-gray text-md py-2 cursor-pointer font-bold">
                            Détails
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div>
              <div className="text-white mb-1 flex items-center bg-primary p-3 w-full">
                <FaOpencart className="mr-4" />{" "}
                <p>Vous n&apos; avez pas de commande! </p>
              </div>
              <Link href="/products">
                <button className="text-white rounded-full bg-primary px-14 py-3 mt-9 hover:bg-secondary">
                  Faite votre commande
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileScreen;
