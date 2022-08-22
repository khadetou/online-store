import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { forgotPass, reset } from "store/reducers/auth/index";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ForgotScreen = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { message, isError, isSuccess } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast.error(message.message);
      dispatch(reset());
    }
    if (isSuccess) {
      router.push("/password/checkmail");
      toast.success(message.message);
      dispatch(reset());
    }
  }, [isError, message, isSuccess, router]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (email) {
      dispatch(forgotPass(email));
    }
  };

  return (
    <section className="mb-28">
      <div className="containers">
        <h1 className="text-center my-[15px] text-xl text-[#2b2b2b]">
          Mot de passe oublié
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[40px] focus:border-gray-200 focus:ring-0"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-primary rounded-full text-sm font-medium py-3 px-7"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotScreen;
