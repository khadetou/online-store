import { FC, useEffect, useState } from "react";
import RcDrawer from "rc-drawer";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/images/marchelogo.svg";
import { IPlacement } from "rc-drawer/lib/IDrawerPropTypes";
import { useCart } from "react-use-cart";

interface DrawerProps {
  className?: string;
  children?: any;
  closeButton: any;
  closeButtonStyle?: string;
  drawerHandler: any;
  toggleHandler: () => void;
  open: boolean;
  width?: string;
  placement?: IPlacement;
  drawerStyle?: string;
  closeBtnStyle?: string;
  props?: any;
}

const Drawer: FC<DrawerProps> = ({
  className,
  children,
  closeButton,
  closeButtonStyle,
  drawerHandler,
  toggleHandler,
  open,
  width,
  placement,
  drawerStyle,
  closeBtnStyle,
  props,
}) => {
  const { totalItems } = useCart();
  const [totalItem, setTotalItem] = useState(0);
  useEffect(() => {
    setTotalItem(totalItems);
  }, [totalItems]);

  return (
    <>
      <RcDrawer
        open={open}
        onClose={toggleHandler}
        className={`drawer ${className} || ""`.trim()}
        wrapperClassName="w-[500px]"
        placement={placement}
        handler={false}
        level={null}
        duration={"0.4s"}
        {...props}
      >
        {closeButton && (
          <div className="px-[30px]">
            <div className="border-b-[0.1px] border-light-gray pb-7">
              <div onClick={toggleHandler} className={closeBtnStyle}>
                {closeButton}
              </div>
              <p className="font-medium text-[13px] text-dark-gray uppercase pt-8 ">
                Shopping cart{" "}
                <span className="text-white sm ml-3 bg-primary rounded-full px-[5px] py-[0.7px]">
                  {totalItem}
                </span>
              </p>
            </div>
          </div>
        )}
        <div className={drawerStyle}>{children}</div>
      </RcDrawer>
    </>
  );
};

export default Drawer;
