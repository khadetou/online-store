import React, { Dispatch, FC, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalInterface {
  children: any;
  ref: any;
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalInterface> = forwardRef(
  ({ children, openModal, setOpenModal }, ref) => {
    useImperativeHandle(ref, () => {
      return {
        open: () => setOpenModal(true),
        close: () => setOpenModal(false),
      };
    });
    return (
      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{
                scale: 0,
                transition: {
                  delay: 0.3,
                },
              }}
              className="modal-content-wrapper overflow-auto z-50 fixed w-[900px] h-[500px] bg-white m-auto top-0 bottom-0 left-0 right-0 p-[20px]"
            >
              <motion.div
                initial={{
                  x: 100,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.3,
                  },
                }}
                exit={{
                  x: 100,
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="modal-content"
              >
                {children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);
Modal.displayName = "Modal";
export default Modal;
