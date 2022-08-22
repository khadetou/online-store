import Link from "next/dist/client/link";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { register, reset } from "store/reducers/auth/index";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const RegisterScreen = () => {
  const [show, setShow] = useState(false);
  const [confShow, setConfShow] = useState(false);
  const [formeData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const dispatch = useAppDispatch();
  const { isError, message, isSuccess, token } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter();

  useEffect(() => {
    if (isError) {
      if (Array.isArray(message.message)) {
        toast.error(message.message[0]);
      }
      toast.error(message.message);
      dispatch(reset());
    }

    if (isSuccess || token) {
      toast.success("User registered successfully!");
      router.push("/login");
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch, router, token]);

  const onChange = (e: any) => {
    setFormData({ ...formeData, [e.target.name]: e.target.value });
  };

  const { email, firstname, lastname, password, password2, phone } = formeData;

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Le mot de passe ne correspond pas!");
    }
    {
      const tokenData = {
        firstname,
        lastname,
        email,
        phone,
        password,
        password2,
      };
      dispatch(register(tokenData));
    }
  };
  return (
    <section className="mb-28">
      <div className="containers">
        <h1 className="text-center my-[15px] text-xl text-[#2b2b2b]">
          Inscription
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
              onChange={(e) => onChange(e)}
              name="firstname"
              type="text"
              value={firstname}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Nom <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => onChange(e)}
              name="lastname"
              type="text"
              value={lastname}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Numéro de Tel <span className="text-red-600">*</span>
            </label>
            <input
              name="phone"
              onChange={(e) => onChange(e)}
              type="tel"
              value={phone}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-base text-dark-gray">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => onChange(e)}
              name="email"
              type="email"
              value={email}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="" className="text-base text-dark-gray">
              Mot de password <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => onChange(e)}
              name="password"
              value={password}
              type={show ? "text" : "password"}
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
              onChange={(e) => onChange(e)}
              name="password2"
              value={password2}
              type={confShow ? "text" : "password"}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
            <div
              className="absolute right-5 cursor-pointer top-[50%] -translate-y-[45%]"
              onClick={() => setConfShow(!confShow)}
            >
              {confShow ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <button className="text-white mb-3 sm:mb-0 bg-primary rounded-full text-sm font-medium py-3 px-7">
              S&apos;inscrire
            </button>
            <Link href="/login">
              <button className="text-sm flex flex-col items-center ">
                <span className="mr-3">Vous n &apos; avez pas de compte</span>
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

export default RegisterScreen;
