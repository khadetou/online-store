import { FC } from "react";
import RcDrawer from "rc-drawer";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/images/marchelogo.svg";
import { IPlacement } from "rc-drawer/lib/IDrawerPropTypes";

interface DrawerProps {
  className?: string;
  children?: any;
  closeButton: any;
  closeButtonStyle?: string;
  drawerHandler: any;
  toggleHandler: () => void;
  open: boolean;
  width: string;
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
  return (
    <>
      <RcDrawer
        open={open}
        onClose={toggleHandler}
        className={`drawer ${className} || ""`.trim()}
        width={width}
        placement={placement}
        handler={false}
        level={null}
        duration={"0.4s"}
        {...props}
      >
        {closeButton && (
          <div className="py-[10px] px-[20px] h-[80px]">
            <div onClick={toggleHandler} className={closeBtnStyle}>
              {closeButton}
            </div>
            <Link passHref href="/">
              <button className="w-[70px] text-white top-0 left-[30px] absolute z-10 cursor-pointer  ">
                <Image
                  src={Logo}
                  alt="logo"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              </button>
            </Link>
            <div className="border-b h-full"></div>
          </div>
        )}
        <div className={drawerStyle}>{children}</div>
      </RcDrawer>
      <div className="drawer__handler inline-block " onClick={toggleHandler}>
        {drawerHandler}
      </div>
    </>
  );
};

export default Drawer;
