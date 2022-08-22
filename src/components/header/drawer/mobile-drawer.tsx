import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { useState } from "react";
import Drawer from "./drawer";
import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";
import Scrollbars from "react-custom-scrollbars-2";
import { RiArrowDropDownLine } from "react-icons/ri";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);
  const [openPages, setOpenPages] = useState(false);
  const [openBoutique, setOpenBoutique] = useState(false);

  const menues = [
    { title: "Accueil", path: "/" },
    { title: "Boutique", path: "/products" },
    { title: "Pages", path: "" },
    { title: "Nous Contacter", path: "/contact" },
  ];

  const pages = [
    {
      title: "A propos",
      path: "/about",
    },
    {
      title: "Faq",
      path: "/faq",
    },
  ];

  const boutique = [
    {
      title: "Panier",
      path: "/cart",
    },
    {
      title: "Paiment",
      path: "/shipping",
    },
  ];
  return (
    <Drawer
      width="280px"
      drawerHandler={
        <div className="flex items-center mr-4 justify-center shrink-0 w-[40px] lg:hidden">
          <AiOutlineBars size="45px" color="#000" />
        </div>
      }
      open={open}
      toggleHandler={() => setOpen(!open)}
      closeButton={<IoCloseOutline size="38px" color="#000" />}
      drawerStyle="w-full h-full"
      closeBtnStyle="flex items-center justify-center top-[18px] right-[30px] absolute z-10 cursor-pointer"
    >
      <Scrollbars autoHide>
        <div className="w-full h-full flex flex-col pt-[20px] pb-[40px] px-[20px]">
          <div className="w-full flex flex-col menu">
            <ul>
              {menues.map(({ title, path }, key) => (
                <li key={key} className=" relative w-full">
                  <Link key={key} href={path}>
                    <a
                      className="block border-b text-[#444444] py-[10px] hover:bg-gray-200 font-medium text-[15px]  hover:text-secondary"
                      onClick={() => setOpen(false)}
                    >
                      {title}
                    </a>
                  </Link>
                  {title.toLocaleLowerCase() === "pages" && (
                    <RiArrowDropDownLine
                      size="27"
                      className={`${
                        openPages && "rotate-180"
                      } transition-all ease-in-out duration-500 absolute h-[44px] cursor-pointer top-0 right-0`}
                      onClick={() => setOpenPages(!openPages)}
                    />
                  )}
                  {title.toLocaleLowerCase() === "pages" && (
                    <ul
                      className={`${
                        openPages ? "visible h-full" : "invisible h-0"
                      } transition-[max-heigth] ease-out duration-1000`}
                    >
                      {pages.map(({ title, path }, idx) => (
                        <Link key={idx} href={path}>
                          <li className="w-full" onClick={() => setOpen(false)}>
                            <a className="block border-b text-[#777777] pl-[15px] py-[10px] hover:bg-gray-200 font-medium text-sm  hover:text-secondary">
                              {title}
                            </a>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                  {title.toLocaleLowerCase() === "boutique" && (
                    <RiArrowDropDownLine
                      size="27"
                      className={`${
                        openBoutique && "rotate-180"
                      } transition-all ease-in-out duration-500 absolute h-[44px] cursor-pointer top-0 right-0`}
                      onClick={() => setOpenBoutique(!openBoutique)}
                    />
                  )}
                  {title.toLocaleLowerCase() === "boutique" && (
                    <ul
                      className={`${
                        openBoutique ? "visible h-full" : "invisible h-0"
                      } transition-[max-heigth] ease-out duration-1000`}
                    >
                      {boutique.map(({ title, path }, idx) => (
                        <Link key={idx} href={path}>
                          <li className="w-full" onClick={() => setOpen(false)}>
                            <a className="block border-b text-[#777777] pl-[15px] py-[10px] hover:bg-gray-200 font-medium text-sm  hover:text-secondary">
                              {title}
                            </a>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Scrollbars>
    </Drawer>
  );
};

export default MobileDrawer;
