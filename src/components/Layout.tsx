import Aos from "aos";
import React, { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { defaultProps } from "react-select/dist/declarations/src/Select";

interface LayoutProp {
  children: React.ReactNode;
  openModal?: boolean;
  setOpenModal?: any;
  bg?: any;
}

const Layout: FC<LayoutProp> = ({ children, openModal, setOpenModal, bg }) => {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
    openModal
      ? (document.querySelector("html")!.style.overflow = "hidden")
      : (document.querySelector("html")!.style.overflow = "auto");
  }, [openModal]);

  return (
    <>
      {openModal && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              delay: 0.3,
            },
          }}
          onClick={() => setOpenModal(false)}
          className="modal-backdrop cursor-pointer z-50 fixed h-screen w-screen top-0 left-0 bg-[#00000060]"
        ></motion.div>
      )}

      <main className={bg}>{children}</main>
    </>
  );
};

export default Layout;
Layout.defaultProps = {
  bg: "bg-white",
};
