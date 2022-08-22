import React from "react";
import { BsCheck, BsTrash } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";

const UsersScreen = () => {
  const theader = ["ID", "Profile", "Nom", "Email", "Phone", "Admin", "Action"];

  const users = [
    {
      firstName: "Khadetou",
      lastName: "Khadetou",
      email: "khadetou96@gmail.com",
      phone: "78 600 45 64",
    },
    {
      firstName: "Khadetou",
      lastName: "Khadetou",
      email: "khadetou96@gmail.com",
      phone: "78 600 45 64",
    },
    {
      firstName: "Khadetou",
      lastName: "Khadetou",
      email: "khadetou96@gmail.com",
      phone: "78 600 45 64",
    },
    {
      firstName: "Khadetou",
      lastName: "Khadetou",
      email: "khadetou96@gmail.com",
      phone: "78 600 45 64",
    },
    {
      firstName: "Khadetou",
      lastName: "Khadetou",
      email: "khadetou96@gmail.com",
      phone: "78 600 45 64",
    },
  ];
  return (
    <section className="mb-36">
      <div className="containers">
        <h1 className="text-[25px] text-dark-gray mb-10">Utilisateurs</h1>
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
              {users.map(({ email, firstName, lastName, phone }, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b border-gray-200 even:bg-gray-50"
                >
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div>#idsfzefzefzef</div>
                  </td>

                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div className="text-xs rounded-full py-3 bg-black text-white w-[46px]">
                      KD
                    </div>
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div>
                      {firstName} {lastName}
                    </div>
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div>{email}</div>
                  </td>
                  <td className="p-4 min-w-[161px] text-center text-sm  text-[#8f8f8f]">
                    <div className="font-medium">{phone}</div>
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div className="flex justify-center items-center">
                      <BsCheck className="text-white bg-green-600 text-[25px]  rounded-md" />
                    </div>
                  </td>
                  <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                    <div className="w-full h-full flex justify-around items-center">
                      <TbEdit className="text-white text-[25px] bg-orange-500 p-1 rounded-md" />
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

export default UsersScreen;
