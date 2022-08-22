import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { login, reset } from "store/reducers/auth/index";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const LoginScreen = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useAppDispatch();
  const { isError, message, isSuccess } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast.error(message.message);
    }
    if (isSuccess) {
      if (router.query && router.query.from) {
        router.push(router.query.from as string);
      } else {
        router.push("/");
      }
    }
    dispatch(reset());
  }, [isError, message, isSuccess, router, dispatch]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <section className="mb-28">
      <div className="containers">
        <h1 className="text-center my-[15px] text-xl text-[#2b2b2b]">
          Se Connecter
        </h1>
        <form
          onSubmit={onSubmit}
          className="max-w-[588px] p-[30px] mx-auto border-2 border-dashed"
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => onChange(e)}
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
              onChange={(e) => onChange(e)}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
            <div
              className="absolute right-5 cursor-pointer top-[50%] -translate-y-[45%]"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <button className="text-white sm:mb-0 mb-4 bg-primary rounded-full text-sm font-medium py-3 px-7">
              Se Connecter
            </button>
            <Link href="/register">
              <button className="text-sm flex flex-col items-center ">
                <span className="mr-3">Vous n &apos; avez de compte ?</span>
                <span className="underline text-primary">Inscrivez vous</span>
              </button>
            </Link>
          </div>
          <Link href="/password/forgot">
            <p className="text-center text-sm font-medium hover:text-secondary cursor-pointer mt-5">
              Mot de pass oublier
            </p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LoginScreen;
