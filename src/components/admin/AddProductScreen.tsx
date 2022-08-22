import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { createProducts, reset } from "store/reducers/products/productSlice";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { is } from "immer/dist/internal";
import Link from "next/link";

const AddProductScreen = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    rating: 0,
    price: 0,
    countInStock: 0,
  });

  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.products
  );
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [image, setImages] = useState<any>([]);

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onChangeImage = (e: any) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray: any) => [...oldArray, reader.result]);
          setImagesPreview((oldArray: any) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const { brand, category, countInStock, description, name, price, rating } =
    values;

  useEffect(() => {
    if (isError) {
      if (
        message.message !== "undefined" &&
        message.message.length > 0 &&
        Array.isArray(message.message)
      ) {
        let list: Array<string> = [...message.message];
        list.map((item: any) => toast.error(item));
      } else {
        toast.error(message.message);
      }
    }
    if (isSuccess) {
      toast.success("Produit créé avec succées!");
      dispatch(reset());
    }
    dispatch(reset());
  }, [isError, dispatch, message, isSuccess]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const roomData = {
      brand,
      price: Number(price),
      countInStock: Number(countInStock),
      description,
      name,
      rating: Number(rating),
      category,
      image,
    };

    if (image.length === 0) {
      return toast.error("Upload an image");
    }

    dispatch(createProducts(roomData));
  };

  return (
    <section className="mb-28">
      <div className="containers">
        <h1 className="text-center my-[15px] text-xl text-[#2b2b2b]">
          Ajouter un produit
        </h1>
        <form
          onSubmit={onSubmit}
          className="max-w-[588px] p-[30px] mx-auto border-2 border-dashed"
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Nom du produit <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Marque <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => onChange(e)}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Catégorie <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={category}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Description <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={description}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="" className="text-base text-dark-gray">
              Evaluation <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="5"
              name="rating"
              required
              onChange={(e) => onChange(e)}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="" className="text-base text-dark-gray">
              Nombres d &lsquo; elements <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="5"
              required
              name="countInStock"
              onChange={(e) => onChange(e)}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="" className="text-base text-dark-gray">
              Prix <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="price"
              min="0"
              step="100"
              placeholder="50000"
              required
              onChange={(e) => onChange(e)}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex w-full mb-5 items-center justify-center bg-grey-lighter">
            <label
              htmlFor="images"
              className="w-full flex flex-col items-center px-4 py-1 bg-white text-primary rounded-lg shadow-lg tracking-wide uppercase border border-primary cursor-pointer hover:bg-primary hover:text-white"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>

              <span className="mt-2 text-base leading-normal">
                Choisir un image
              </span>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={(e) => onChangeImage(e)}
                className=" hidden "
              />
            </label>
          </div>
          <div className="flex flex-wrap">
            {imagesPreview.map((image: any, idx: any) => (
              <div key={idx} className="mb-8 w-[100px] h-[100px]">
                <Image
                  src={image}
                  alt="Images preview"
                  className="mt-3 mr-2"
                  layout="responsive"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              className="text-white bg-primary rounded-full text-sm font-medium py-3 flex px-7 hover:bg-secondary mr-2 items-center"
              disabled={isLoading}
            >
              {isLoading && <Loading />} Soumettre
            </button>
            <Link href="/admin/products">
              <button
                className="hover:text-white  bg-white border-2 hover:bg-primary border-primary text-primary rounded-full text-sm font-medium py-3 px-7"
                disabled={isLoading}
              >
                Retourner
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProductScreen;
