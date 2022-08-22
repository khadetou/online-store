import { FaBars } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { FC, useEffect, useState } from "react";
import Drawer from "./drawer";
import Empty from "../components/empty";
import Items from "../components/items";
import { Item, useCart } from "react-use-cart";

const Cartdrawer: FC<{ open: any; setOpen: any }> = ({ open, setOpen }) => {
  const [value, setValue] = useState<number>(1);

  const { isEmpty } = useCart();

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setEmpty(isEmpty);
  }, [isEmpty]);

  return (
    <Drawer
      drawerHandler={
        <div className="flex items-center justify-center shrink-0 w-[26px]">
          <FaBars size="26px" color="#000" />
        </div>
      }
      open={open}
      placement="right"
      toggleHandler={() => setOpen(!open)}
      closeButton={
        <VscClose
          size="26px"
          className="text-[#8f8f8f] hover:text-red-600 hover:rotate-90 transition-all duration-200"
        />
      }
      drawerStyle="w-full h-full"
      closeBtnStyle="flex items-center justify-center top-[25px] right-[30px] text-[] absolute z-10 cursor-pointer "
      className="cart"
    >
      <div className="w-full  h-full flex flex-col  pt-[30px] pb-[40px] pl-3 lg:px-[30px]">
        {!empty ? <Items /> : <Empty />}
      </div>
    </Drawer>
  );
};

export default Cartdrawer;
