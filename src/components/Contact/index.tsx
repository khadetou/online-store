import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { sendMess, reset } from "store/reducers/auth/index";
import { toast } from "react-toastify";

const ContactScreen = () => {
  const [messages, setMessages] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const { message, isError, isSuccess } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message.message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success("Message Envoyé !");
      dispatch(reset());
      setMessages("");
      setSubject("");
      setEmail("");
      setName("");
    }
  }, [isError, isSuccess, dispatch, message]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const messageData = {
      messages,
      email,
      subject,
      name,
    };
    dispatch(sendMess(messageData));
  };

  return (
    <section className="mt-[30px]">
      <div className="containers flex flex-col md:flex-row">
        <div className="max-w-[400px] w-full h-[857px] flex items-center p-[10px]">
          <Image
            src="https://res.cloudinary.com/didh3wbru/image/upload/v1658414821/Ecommerce/Images/Banner%20Images/contact-ok_qjgwv9.jpg"
            alt="image"
            width={402}
            height={708}
            className="mb-5"
          />
        </div>
        <div className="p-[10px] flex flex-col w-full">
          <div className="border-b pb-10 mb-8">
            <h1 className="text-[30px] font-semibold text-primary capitalize">
              Donnez vos opinions sur les services
            </h1>
            <p className="text-sm mt-5 leading-[2]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate.
            </p>
            <div className="flex w-full justify-between flex-col md:flex-row mt-5  ">
              <div className="w-full max-w-[482px]">
                <h1 className="text-sm uppercase text-dark-gray font-semibold mb-7">
                  Notre Location
                </h1>
                <p className="text-sm text-gray-400 mb-7">39 Castors Dakar</p>
                <h1 className="text-sm uppercase text-dark-gray font-semibold mb-7">
                  Contact Information
                </h1>
                <p className="text-sm text-gray-400">
                  hotcodesageny96@gmail.com
                </p>
              </div>
              <div className="w-full max-w-[296px] relative">
                <h1 className="text-sm uppercase text-dark-gray font-semibold mb-7 mt-5 md:mt-0">
                  Heures de travaille
                </h1>
                <div className="mt-5">
                  <p className="text-sm mb-2 text-gray-400">
                    Lundi - Vendredi:
                  </p>
                  <h3 className="text-sm text-black">5h00 - 21h00</h3>
                </div>
                <div className="mt-5">
                  <p className="text-sm mb-2 text-gray-400">
                    Samedi - Dimanche:
                  </p>
                  <h3 className="text-sm text-black">8h00 - 21h00</h3>
                </div>
                <div className="absolute -bottom-12 -right-2 mb-5 rounded-md hidden lg:block ">
                  <Image
                    src="https://res.cloudinary.com/didh3wbru/image/upload/v1658418611/Ecommerce/Images/Banner%20Images/la-about-2_zzjff6.png"
                    alt="image"
                    width={166}
                    height={126}
                  />
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <h1 className="text-[30px] mb-8 font-semibold text-primary capitalize">
              Laissez un message
            </h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Prenom et Nom"
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[50px] focus:border-gray-200 focus:ring-0"
            />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[50px] focus:border-gray-200 focus:ring-0"
            />
            <input
              type="text"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              placeholder="Sujet"
              className="w-full border-gray-200 mb-5 px-5 text-sm placeholder:text-gray-400 rounded-md h-[50px] focus:border-gray-200 focus:ring-0"
            />
            <textarea
              name="message"
              id="message"
              onChange={(e) => setMessages(e.target.value)}
              value={messages}
              placeholder="Message"
              cols={30}
              rows={8}
              className="w-full border-gray-200 rounded-md text-sm placeholder:text-gray-400 focus:border-gray-200 focus:ring-0"
            ></textarea>

            <button className="bg-primary rounded-full text-xs font-bold uppercase text-white my-8 py-3 px-10 hover:bg-secondary">
              Soumettre
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactScreen;
