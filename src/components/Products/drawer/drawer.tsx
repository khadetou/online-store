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
  return (
    <>
      <RcDrawer
        open={open}
        onClose={toggleHandler}
        className={`drawer ${className} || ""`.trim()}
        width="300px"
        wrapperClassName="w-[500px]"
        placement={placement}
        handler={false}
        level={null}
        duration={"0.4s"}
        {...props}
      >
        {closeButton && (
          <div className="px-[30px]">
            <div className=" pb-7">
              <div onClick={toggleHandler} className={closeBtnStyle}>
                {closeButton}
              </div>
            </div>
          </div>
        )}
        <div className={drawerStyle}>{children}</div>
      </RcDrawer>
    </>
  );
};

export default Drawer;
