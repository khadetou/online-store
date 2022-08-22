import { useAppDispatch, useAppSelector } from "@/hooks/index";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { reset, UpdateUser } from "store/reducers/auth";

const EditScreen = () => {
  const [show, setShow] = useState(false);
  const [confShow, setConfShow] = useState(false);

  const { user, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    });

    if (isError) {
      toast.error(message.message);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success("Votre profile a été mise à jour avec succés !");
    }
    dispatch(reset());
  }, [isError, message, isSuccess, dispatch]);

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formData.password === formData.password2) {
      console.log(formData);
      dispatch(UpdateUser(formData));
    } else {
      return toast.error("Vos mots de pass ne correspondent pas!");
    }
  };

  return (
    <section className="mb-28">
      <div className="containers">
        <h1 className="text-center my-[15px] text-xl text-[#2b2b2b]">
          Modifier Profile
        </h1>
        <form
          onSubmit={onSubmit}
          className="max-w-[588px] p-[30px] mx-auto border-2 border-dashed"
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Prénom <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              onChange={onChange}
              value={formData.firstname}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Nom <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              onChange={onChange}
              value={formData.lastname}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Numéro de Tel <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              onChange={onChange}
              name="phone"
              value={formData.phone}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={onChange}
              value={formData.email}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="" className="text-base text-dark-gray">
              Mot de password <span className="text-red-600">*</span>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              onChange={onChange}
              value={formData.password}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
            <div
              className="absolute right-5 cursor-pointer top-[50%] -translate-y-[45%]"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="" className="text-base text-dark-gray">
              Confirmer Mot de password <span className="text-red-600">*</span>
            </label>
            <input
              type={confShow ? "text" : "password"}
              name="password2"
              value={formData.password2}
              onChange={onChange}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
            <div
              className="absolute right-5 cursor-pointer top-[50%] -translate-y-[45%]"
              onClick={() => setConfShow(!confShow)}
            >
              {confShow ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="flex justify-between">
            <button className="text-white bg-primary rounded-full text-sm font-medium py-3 px-7">
              Mettre à jour
            </button>
            <Link href="/profile">
              <div className="text-primary cursor-pointer bg-white border border-primary rounded-full text-sm font-medium py-3 px-7">
                Retourner
              </div>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditScreen;
