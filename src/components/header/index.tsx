import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { FiAlignJustify } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillCaretDown,
} from "react-icons/ai";
import { HiPhone } from "react-icons/hi";
import MobileDrawer from "./drawer/mobile-drawer";
import Image from "next/image";
import Logo from "/public/images/online-logo.svg";
import Cart from "/public/images/icons/cart.svg";
import User from "/public/images/icons/user.svg";
import WishList from "/public/images/icons/wishlist.svg";
import { useRouter } from "next/router";
import Cartdrawer from "../cart/drawer/cartdrawer";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { logout } from "store/reducers/auth/index";
import { useCart } from "react-use-cart";

interface HeaderProps {
  className?: string;
  bgClassName?: string;
  buttonClassName?: string;
  open: any;
  setOpen: any;
}

interface IconProps {
  className?: string;
  size?: number | string;
}

const Icons: FC<{
  Icon: any;
  className?: string;
  open: any;
  setOpen: any;
}> = ({ Icon, className, open, setOpen }) => {
  const toggleCart = () => {
    if (Icon === AiOutlineShoppingCart) {
      setOpen(!open);
    }
  };
  useEffect(() => {
    if (open) {
      document.querySelector("html")!.style.overflow = "hidden";
    } else {
      document.querySelector("html")!.style.overflow = "auto";
    }
  }, [open]);

  const { isAuthenticated, roles, user } = useAppSelector(
    (state) => state.auth
  );

  const { totalItems } = useCart();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(totalItems);
  }, [totalItems]);

  return (
    <>
      <div
        className={`rounded-full p-[13px] bg-primary relative cursor-pointer ${className}`}
        onClick={toggleCart}
      >
        {Icon === AiOutlineShoppingCart && (
          <span className="absolute top-[-20%] right-[-12%] rounded-full bg-secondary py-1 px-2 text-xs">
            {total}
          </span>
        )}
        {Icon === AiOutlineShoppingCart && (
          <Icon className="text-base text-white" />
        )}
        {Icon === AiOutlineUser && !isAuthenticated ? (
          <Link href="/login">
            <div>
              <Icon className="text-base text-white" />
            </div>
          </Link>
        ) : (
          Icon === AiOutlineUser && (
            <p className="text-sm font-semibold">
              {user && user.firstname[0]}
              {user && user.lastname[0]}
            </p>
          )
        )}
      </div>
    </>
  );
};

const Header: FC<HeaderProps> = ({ className, bgClassName, open, setOpen }) => {
  const menues = [
    { title: "Accueil", path: "/" },
    { title: "Boutique", path: "/products" },
    { title: "Pages", path: "/work" },
    { title: "Nous Contacter", path: "/contact" },
  ];

  const [openProfile, setOpenProfile] = useState(false);

  const category = [
    "Fruits & L??gumes",
    "Suppl??ments",
    "Produits laitier & Oeufs",
    "Epices",
    "Poisson",
    "C??r??ales",
    "Viandes",
  ];

  const Socials = [
    {
      Social: TiSocialFacebook,
      className:
        "text-[20px] transition-all duration-300 ease-in-out hover:bg-blue-800 hover:text-white ",
      size: "20px",
    },
    {
      Social: AiOutlineTwitter,
      className:
        "text-[18px] transition-all duration-300 ease-in-out hover:text-white hover:bg-blue-500 ",
      size: "18px",
    },
    {
      Social: AiOutlineInstagram,
      className:
        "text-[18px] transition-all duration-300 ease-in-out hover:text-white hover:bg-pink-600",
      size: "18px",
    },
    {
      Social: TiSocialLinkedin,
      className:
        "text-[20px] transition-all duration-300 ease-in-out hover:text-white hover:bg-blue-600",
      size: "20px",
    },
  ];

  const { pathname, push } = useRouter();

  const [rotate, setRotate] = useState(false);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const { clearCartMetadata, emptyCart } = useCart();
  const [filterData, setFilterData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [focused, setFocused] = useState(false);

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const keyword = products.filter((product: any) => {
      return product.name
        .toLowerCase()
        .includes(searchWord.toLocaleLowerCase());
    });

    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(keyword);
    }
  };

  const clearInput = () => {
    setFilterData([]);
    setWordEntered("");
  };

  const clearFilteredData = () => {
    setFilterData([]);
  };

  const onSubmit = (keyword?: string) => {
    if (keyword!.trim()) {
      push(`/products?keyword=${keyword}`);
    }
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    if (wordEntered.trim()) {
      push(`/products?keyword=${wordEntered}`);
    }
  };

  const [langOpen, setLangOpen] = useState(true);
  const [currencyOpen, setCurrencyOpen] = useState(true);

  return (
    <header className="relative  h-[188px] bg-white">
      <div
        className={`text-white w-full  absolute z-20 min-w-0 top-0 left-0 transition-all ease-in duration-[0.4s] h-[116px]  ${className}`}
      >
        <div className="py-[10px] border-b border-[#eee]">
          <div className="containers">
            <div className="row flex  justify-between mt-0 mx-[-15px] items-center">
              <div className="text-left hidden lg:block">
                <div className="flex">
                  {Socials.map(({ Social, className, size }, idx) => (
                    <div key={idx} className="mr-2 last:mr-0 ">
                      <a
                        className={`w-[25px] h-[25px] text-center flex rounded-full items-center justify-center text-[15px] bg-[#f7f7f7f7] text-[#777] ${className} cursor-pointer`}
                      >
                        <Social size={size} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-light-gray text-left lg:text-center hidden sm:block">
                <p className="text-[13px] font-light">
                  FREE SHIPPING THIS WEEK ORDER OVER -$75
                </p>
              </div>
              <div className="flex text-light-gray text-[13px] font-normal justify-end ">
                <div
                  className="flex pl-[18px] cursor-pointer relative"
                  onClick={() => {
                    setCurrencyOpen(!currencyOpen);
                    if (currencyOpen) {
                      setLangOpen(true);
                    }
                  }}
                >
                  <button>CURRENCY</button>
                  <AiFillCaretDown className="mt-[2px] ml-[7px]" size={15} />
                  <ul
                    className={`text-light-gray absolute top-8 px-[10px] border -left-7 z-50 bg-white shadow-md transition-all ease-in-out duration-500 ${
                      currencyOpen && "opacity-0 invisible "
                    }`}
                  >
                    <li className="p-[7px] w-[108px] border-b">USD $</li>
                    <li className="p-[7px] w-[108px]">EUR ???</li>
                  </ul>
                </div>
                <div
                  className={`flex pl-[18px] cursor-pointer relative `}
                  onClick={() => {
                    setLangOpen(!langOpen);
                    if (langOpen) {
                      setCurrencyOpen(true);
                    }
                  }}
                >
                  <button>LANGUAGE</button>
                  <AiFillCaretDown className="mt-[2px] ml-[7px]" size={15} />
                  <ul
                    className={`text-light-gray absolute top-8 px-[10px] border -left-7 z-50 bg-white shadow-md  transition-all ease-in-out duration-500 ${
                      langOpen && "opacity-0 invisible"
                    } `}
                  >
                    <li className="p-[7px] w-[108px] border-b">ENGLISH</li>
                    <li className="p-[7px] w-[108px]">FRENCH</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full bg-header h-full flex-col flex items-center ${bgClassName}`}
        >
          <div className="flex py-1 lg:py-5 justify-between items-center relative containers p-[10px]">
            <div className="flex lg:items-center w-[180px] flex-col  lg:w-full lg:justify-between lg:mr-14 lg:flex-row">
              <div className="flex items-center">
                <MobileDrawer />
                <Link passHref href="/">
                  <div className="flex items-center cursor-pointer ">
                    <button className="w-[63px]">
                      <Logo />
                    </button>
                    <h1 className="text-light-gray hidden sm:block text-sm lg:text-2xl uppercase font-bold ml-2">
                      <span className="font-light">Online </span> Store
                    </h1>
                  </div>
                </Link>
              </div>
              <div className=" lg:static absolute lg:w-[500px] left-0  w-full top-[100%] p-[10px] mx-auto ">
                <form
                  onSubmit={onSearch}
                  className="h-[45px] w-full max-w-[500px] mx-auto mt-0 md:mt-2 lg:mt-0 relative group"
                >
                  <input
                    type="text"
                    onFocus={() => {
                      setFocused(true);
                      setRotate(true);
                    }}
                    value={wordEntered}
                    onChange={handleFilter}
                    onBlur={() => {
                      setRotate(false);
                      setFocused(false);
                    }}
                    className="w-full h-full group focus:ring-1 focus:ring-gray-200 border-0 text-sm py-[1px] pl-5 pr-[50px] h-full-400 bg-gray-100  text-gray-600 "
                    placeholder="Search products..."
                  />
                  <button
                    type="submit"
                    className={`absolute p-4 right-0 bottom-0 top-0 transition-all duration-300 ease-linear group-hover:rotate-[110deg] ${
                      rotate && "rotate-[110deg]"
                    }`}
                  >
                    <BiSearchAlt size="23px" className="text-gray-700" />
                  </button>

                  {filterData.length != 0 && (
                    <div
                      className={`shadow-lg p-2 bg-white rounded-md z-10 absolute w-full `}
                    >
                      {filterData.slice(0, 15).map((data: any) => (
                        <Link
                          key={data._id}
                          href={`/products?keyword=${data.name}`}
                        >
                          <button
                            className="text-dark-gray text-sm font-semibold w-full text-start p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out cursor-pointer z-50 rounded-sm"
                            onClick={() => onSubmit(data.name)}
                          >
                            <p>{data.name}</p>
                          </button>
                        </Link>
                      ))}
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <div className="flex justify-between">
                  <div
                    className={`mr-2 last:mr-0 flex  cursor-pointer items-center pr-[9px] `}
                    onClick={() => {
                      setOpenProfile(!openProfile);
                    }}
                  >
                    <User className="w-[36px] h-[42px] fill-[#444444] hover:fill-orange-500 transition-all duration-300 ease-in-out" />
                  </div>
                  <div
                    className={`mr-2 last:mr-0 flex  cursor-pointer items-center ml-6 group relative pr-[9px]`}
                  >
                    <WishList className="w-[36px] h-[42px] fill-[#444444] group-hover:fill-orange-500 transition-all duration-300 ease-in-out" />
                    <span className="rounded-full text-[12px] absolute w-[20px] h-[20px] bottom-0 px-1 font-semibold leading-5 group-hover:bg-black transition-all ease-in-out duration-300 bg-light-gray text-white top-auto right-0 text-center ">
                      3
                    </span>
                  </div>
                  <div
                    className={`mr-2 last:mr-0 flex group cursor-pointer items-center ml-6 relative pr-[9px]`}
                  >
                    <Cart className="w-[34px] h-[42px] fill-[#444444] group-hover:fill-orange-500 transition-all duration-300 ease-in-out" />
                    <span className="rounded-full text-[12px] absolute w-[20px] h-[20px] bottom-0 px-1 font-semibold leading-5 group-hover:bg-black transition-all ease-in-out duration-300 bg-light-gray text-white top-auto right-0 text-center">
                      2
                    </span>
                  </div>
                </div>
              </div>
              <Cartdrawer open={open} setOpen={setOpen} />
            </div>
          </div>
          <div className="bg-primary w-full hidden lg:block">
            <div className="flex justify-between items-center containers  relative p-[10px]">
              <div className="text-white font-medium bg-secondary group px-8 py-3 rounded-full flex items-center">
                <FiAlignJustify className="mr-3" /> <p>Categories</p>
                <div className="absolute !w-[245px] rounded-md top-7  bg-white transition-transform ease-linear duration-300 shadow-xl  text-dark   invisible translate-x-3 text-dark-gray translate-y-12 opacity-0  group-hover:visible group-hover:opacity-100 group-hover:translate-y-[35px] group-hover:translate-x-[-30px]">
                  {category.map((item, idx) => (
                    <div key={idx}>
                      <Link passHref href={`/products?keyword=${item}`}>
                        <a className="!text-base inline-block px-3 w-full py-4 hover:text-secondary hover:bg-gray-100 !font-normal  ">
                          {item}
                        </a>
                      </Link>
                      <hr className="text-light-gray" />
                    </div>
                  ))}
                </div>
              </div>
              <nav className="mx-auto hidden lg:flex nav">
                {menues.map(({ title, path }, key) => (
                  <Link key={key} href={path}>
                    <button
                      className={`flex items-center px-1 mx-3 my-1 py-3 xl:px-1 xl:py-3 relative group  font-normal leading-none text-sm  before:contente-[""] before:w-0  hover:before:w-full before:h-[3px] before:transition-all before:left-0 before:bg-secondary before:absolute before:bottom-1  hover:text-secondary before:duration-500 ease-linear ${className} ${
                        pathname.endsWith(path) &&
                        "before:!bg-secondary before:!w-full !text-secondary"
                      }
                      ${
                        title === "Boutique" &&
                        pathname.endsWith("cart") &&
                        "before:!bg-secondary before:!w-full !text-secondary"
                      }
                      ${
                        title === "Boutique" &&
                        pathname.endsWith("shipping") &&
                        "before:!bg-secondary before:!w-full !text-secondary"
                      }
                      ${
                        title === "Pages" &&
                        pathname.endsWith("about") &&
                        "before:!bg-secondary before:!w-full !text-secondary"
                      }
                      ${
                        title === "Pages" &&
                        pathname.endsWith("faq") &&
                        "before:!bg-secondary before:!w-full !text-secondary"
                      }
                      `}
                      type="button"
                    >
                      {title}
                      {title.toLocaleLowerCase() === "boutique" && (
                        <RiArrowDropDownLine
                          size="27"
                          className="group-hover:rotate-180 transition-all ease-in-out duration-300"
                        />
                      )}
                      {title.toLocaleLowerCase() === "pages" && (
                        <RiArrowDropDownLine
                          size="27"
                          className="group-hover:rotate-180 transition-all ease-in-out duration-300"
                        />
                      )}
                      {title.toLocaleLowerCase() === "boutique" && (
                        <div className="absolute !w-[200px] rounded-md top-7  bg-white transition-transform ease-linear duration-100 shadow-lg  text-dark-gray  invisible translate-x-3 translate-y-12 opacity-0  group-hover:visible group-hover:opacity-100 group-hover:translate-y-[21px] group-hover:translate-x-0">
                          <Link passHref href="/cart">
                            <a className="!text-[14px] px-5 inline-block w-full py-4 hover:text-secondary hover:bg-gray-100 !font-normal ">
                              Panier
                            </a>
                          </Link>

                          <Link passHref href="/cart/shipping">
                            <a className="!text-[14px] inline-block w-full py-4  hover:text-secondary hover:bg-gray-100 !font-normal ">
                              Paiement
                            </a>
                          </Link>
                        </div>
                      )}
                      {title.toLocaleLowerCase() === "pages" && (
                        <div className="absolute !w-[200px] rounded-md top-7  bg-white transition-transform ease-linear duration-100 shadow-lg  text-dark-gray invisible translate-x-3 translate-y-12 opacity-0  group-hover:visible group-hover:opacity-100 group-hover:translate-y-[21px] group-hover:translate-x-0">
                          <Link passHref href="/about">
                            <a className="!text-[14px] inline-block w-full py-4 hover:text-secondary hover:bg-gray-100 !font-normal">
                              A propos
                            </a>
                          </Link>

                          <Link passHref href="/faq">
                            <a className="!text-[14px] inline-block w-full py-4  hover:text-secondary hover:bg-gray-100 !font-normal">
                              Faqs
                            </a>
                          </Link>
                        </div>
                      )}
                    </button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
