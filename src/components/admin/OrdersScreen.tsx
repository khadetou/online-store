import React, { useEffect } from "react";
import { BsCheck, BsTrash } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { getAllOrders, deleteOrder } from "store/reducers/order/index";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { toast } from "react-toastify";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const OrdersScreen = () => {
  const theader = [
    "ID",
    "Utilisateur",
    "Date",
    "Totale",
    "Payé",
    "Livré",
    "Action",
  ];

  const order = [
    {
      user: "Khadetou Dianifabe",
      Date: "2022 - 07 - 01",
      total: "$255.00",
    },
    {
      user: "Khadetou Dianifabe",
      Date: "2022 - 07 - 01",
      total: "$255.00",
    },
    {
      user: "Khadetou Dianifabe",
      Date: "2022 - 07 - 01",
      total: "$255.00",
    },
    {
      user: "Khadetou Dianifabe",
      Date: "2022 - 07 - 01",
      total: "$255.00",
    },
    {
      user: "Khadetou Dianifabe",
      Date: "2022 - 07 - 01",
      total: "$255.00",
    },
  ];
  const dispatch = useAppDispatch();
  const { isError, isSuccess, orders, message } = useAppSelector(
    (state) => state.orders
  );
  useEffect(() => {
    dispatch(getAllOrders());
    if (isError) {
      toast.error(message);
    }
  }, [message, dispatch, isError]);

  const deleteOrders = (id: string) => {
    MySwal.fire({
      title: "Etes vous sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A472E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        dispatch(deleteOrder(id));
        if (isSuccess) {
          Swal.fire("Supprimer", "Produit supprimer avec succés");
        }
      }
    });
  };

  return (
    <section className="mb-36">
      <div className="containers">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-[25px] text-dark-gray ">Commandes</h1>
          <button className="text-white bg-primary text-sm font-medium  h-10 rounded-md px-3">
            Ajouter un produit
          </button>
        </div>
        <div className="overflow-auto rounded-lg shadow-md">
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
                      <div>{order && order._id}</div>
                    </td>

                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      {order.user && order.user.firstname}{" "}
                      {order.user && order.user.lastname}
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div>{order && order.createdAt}</div>
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div>{order && order.totalPrice}</div>
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      {!order.isPaid ? (
                        <div className="flex items-center justify-center">
                          <IoClose className="text-white text-[25px] rounded-md bg-red-600" />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <BsCheck className="text-white bg-green-600 text-[25px]  rounded-md" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      {order && order.isShipped ? (
                        <div className="flex justify-center items-center">
                          <BsCheck className="text-white bg-green-600 text-[25px]  rounded-md" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <IoClose className="text-white text-[25px] rounded-md bg-red-600" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div className="w-full h-full flex justify-around items-center">
                        <Link href={`order/${order._id}`}>
                          <button className="bg-white mr-5 py-2 px-2 text-dark-gray font-bold shadow-md text-sm ">
                            Détails
                          </button>
                        </Link>
                        <BsTrash
                          className="text-white text-[25px] bg-red-500 p-1 cursor-pointer rounded-md"
                          onClick={() => deleteOrders(order._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrdersScreen;
