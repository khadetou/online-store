import { Dispatch, FC, useRef, useEffect, useState } from "react";
import { HiStar } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import StarsRating from "react-star-rate";
import Modal from "./modal";
import ImageGallery from "react-image-gallery";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { getProductById } from "store/reducers/products/productSlice";
import { useCart } from "react-use-cart";

interface ModalsProps {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  open: any;
  setOpen: any;
  id?: string;
}
const ProductItem: FC<ModalsProps> = ({
  openModal,
  setOpenModal,
  id,
  open,
  setOpen,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);
  const { product } = useAppSelector((state) => state.products);

  let array: any[] = [];

  if (product) {
    array = product.image.map((item: any) => {
      return {
        original: item.url,
        thumbnail: item.url,
      };
    });
  }

  const modalRef = useRef<any>();

  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal} ref={modalRef}>
        <div className="flex flex-col  md:flex-row items-center relative h-full w-full ">
          <IoIosClose
            className="absolute right-0 top-0 cursor-pointer text-red-600 text-[25px] transition-all ease-linear duration-200 hover:rotate-90"
            onClick={() => {
              setQty(1);
              setOpenModal(false);
            }}
          />
          <div className="w-[50%]  mb-12 md:mb-0">
            {product && array && (
              <ImageGallery
                items={array}
                additionalClass="product-items group"
                showFullscreenButton={false}
                // useBrowserFullscreen={isLaptop}
              />
            )}
          </div>
          <div className="relative w-1/2 p-[10px]">
            <h2 className="text-2xl font-medium mb-[10px] text-[#2b2b2b]">
              {product && product.name}
            </h2>
            <h3 className="text-[28px] font-normal text-[#8f8f8f] mb-[18px]">
              {product && product.price} FCFA
            </h3>
            <div className="flex text-[0px] mb-[14px] items-center">
              <StarsRating
                value={4.5}
                disabled
                symbol={<HiStar size="25px" />}
                classNamePrefix="stars"
              />
              <p className="text-[14px] text-[#8f8f8f] ml-8">
                ({product && product.review} customer review)
              </p>
            </div>
            <div className="py-[15px]">
              <p className="text-sm text-[#8f8f8f] py-9">
                {product && product.description}
              </p>
            </div>
            <div className="flex">
              <div className="rounded-full border flex items-center justify-center border-light-gray">
                <span
                  className=" px-5  cursor-pointer"
                  onClick={() => {
                    if (qty > 0) {
                      setQty(qty - 1);
                    }
                  }}
                >
                  -
                </span>
                <input
                  className="w-[70px] py-3 px-0 text-light-gray focus:ring-0 border-none text-center text-[14px] "
                  type="number"
                  step={1}
                  min={1}
                  value={qty}
                  onChange={(e: any) => setQty(e.target.value)}
                />
                <span
                  className=" px-5 cursor-pointer"
                  // onClick={addValue}
                  onClick={() => {
                    setQty(qty + 1);
                  }}
                >
                  +
                </span>
              </div>
              <button
                className="ml-2 text-white bg-primary text-sm font-bold rounded-full px-4"
                onClick={() => {
                  addItem({ ...product, id: product._id }, qty);
                  setQty(1);
                  setOpen(true);
                  setOpenModal(false);
                }}
              >
                AJOUTER AU PANIER
              </button>
            </div>
            <p className="text-sm text-[#8f8f8f] mt-5">
              Catégorie:{" "}
              <span className="text-[#2b2b2b]">
                {product && product.category}
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductItem;
