import React from "react";
import { BsCheck, BsTrash } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

const MyOrdersScreen = () => {
  const theader = [
    "ID",
    "Utilisateur",
    "Date",
    "Totale",
    "Payé",
    "Livré",
    "Action",
  ];

  const orders = [
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
              {orders.map(({ Date, total, user }, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b border-gray-200 even:bg-gray-50"
                >
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div>#idsfzefzefzef</div>
                  </td>

                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    {user}
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div>{Date}</div>
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div>{total}</div>
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div className="flex items-center justify-center">
                      <IoClose className="text-white text-[25px] rounded-md bg-red-600" />
                    </div>
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div className="flex justify-center items-center">
                      <BsCheck className="text-white bg-green-600 text-[25px]  rounded-md" />
                    </div>
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div className="w-full h-full flex justify-around items-center">
                      <div className="bg-white py-2 px-2 text-dark-gray font-bold shadow-md text-sm ">
                        Détails
                      </div>
                      <BsTrash className="text-white text-[25px] bg-red-500 p-1 rounded-md" />
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

export default MyOrdersScreen;
