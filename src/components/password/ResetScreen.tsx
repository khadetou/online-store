import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { resetPass, reset } from "store/reducers/auth/index";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ResetScreen = () => {
  const [show, setShow] = useState(false);
  const [confShow, setConfShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isError, isSuccess, message, user } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message.message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success("Mot de passe modifié avec succés");
      dispatch(reset());
      router.push("/login");
    }
  }, [message, isError, dispatch, isSuccess]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Les deux mots sont differentes!");
    } else {
      const resetData = {
        token: router.query.token,
        password,
      };
      dispatch(resetPass(resetData));
    }
  };

  return (
    <section className="my-36">
      <div className="containers">
        <h1 className="text-center my-[15px] text-xl text-[#2b2b2b]">
          Modifiez votre mot de passe
        </h1>
        <form
          onSubmit={onSubmit}
          className="max-w-[588px] p-[30px] mx-auto border-2 border-dashed"
        >
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="" className="text-base text-dark-gray">
              Mot de password <span className="text-red-600">*</span>
            </label>
            <input
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <button
              type="submit"
              className="text-white bg-primary rounded-full text-sm font-medium py-3 px-7"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetScreen;
