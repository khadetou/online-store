import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Item, Metadata, useCart } from "react-use-cart";
import { useAppSelector, useAppDispatch } from "@/hooks/index";
import { createOrder, reset } from "store/reducers/order/index";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// MYSWAL
const MySwal = withReactContent(Swal);

const PlaceOrderScreen = () => {
  const { items, metadata, cartTotal } = useCart();
  const [total, setTotal] = useState(0);
  const [metadatas, setMetadatas] = useState<Metadata>({});
  const [item, setItem] = useState<Item[]>([]);
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { isSuccess, isError, message, isLoading, order } = useAppSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (metadata) {
      setMetadatas(metadata!);
    }
    if (items) {
      setItem(items);
    }
    if (cartTotal) {
      setTotal(cartTotal);
    }
    if (isSuccess) {
      router.push(`/order/${order._id}`);
    }

    if (isError) {
      toast.error(message.message);
      dispatch(reset());
    }
  }, [
    metadata,
    items,
    cartTotal,
    isSuccess,
    isError,
    dispatch,
    order,
    router,
    message,
    message.message,
  ]);

  let cartItems: any[] = [];

  const onSubmit = () => {
    items.map(({ id, price, quantity, name, image }) => {
      cartItems.push({
        name,
        qty: quantity,
        image,
        price,
        product: id,
      });
    });

    const cart = {
      orderItems: cartItems,
      shippingAddress: {
        address: metadata!.address,
        city: metadata!.ville,
        phone: metadata!.phone,
        region: metadata!.region,
      },
      itemsPrice: cartTotal,
      shippingPrice: metadata!.shipping ? metadata!.price : 0,
      totalPrice: cartTotal + (metadata!.shipping ? metadata!.price : 0),
    };

    MySwal.fire({
      title: "Etes vous sure",
      text: "D'avoir bien vérifier votre commande ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0A472E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmez votre commande !",
    }).then((result: any) => {
      if (result.isConfirmed) {
        dispatch(createOrder(cart));
      }
    });
  };

  return (
    <section className="mb-10 mt-3">
      <div className="containers">
        <div className="flex mt-3 mb-8 justify-around border-b pb-3">
          <Link href="/login">
            <button
              className={`${
                router.pathname === "/order/placeorder"
                  ? "!text-dark-gray font-medium"
                  : "text-gray-400 font-normal"
              } text-normal uppercase `}
            >
              Se Connecter
            </button>
          </Link>
          <Link href="/cart/shipping">
            <button
              className={`${
                router.pathname === "/order/placeorder"
                  ? "!text-dark-gray font-medium"
                  : "text-gray-400 font-normal"
              } text-normal uppercase `}
            >
              Livraison
            </button>
          </Link>
          <Link href="/order/placeorder">
            <button
              className={`${
                router.pathname === "/order/placeorder"
                  ? "!text-dark-gray font-medium"
                  : "text-gray-400 font-normal"
              } text-normal uppercase `}
            >
              Finalisez La Commande
            </button>
          </Link>
        </div>

        <h1 className="text-[25px] font-normal mb-12 uppercase ">
          PASSER LA COMMANDE:{" "}
        </h1>
        <div className="flex justify-between  flex-col md:flex-row">
          <div className="max-w-[970px] mr-3 w-full">
            {metadatas.shipping && (
              <div className="w-full">
                <h1 className="text-xl font-normal text-black mb-4 uppercase">
                  Livraison
                </h1>
                <div className="w-full overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300 pb-6">
                        <th className="text-sm pb-8 font-semibold">Nom</th>
                        <th className="text-sm pb-8 font-semibold">Email</th>
                        <th className="text-sm pb-8 font-semibold">Ville</th>
                        <th className="text-sm pb-8 font-semibold">Address</th>
                        <th className="text-sm pb-8 font-semibold">
                          Livraison
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="text-sm py-8 px-1 min-w-[164px] text-dark-gray">
                          {user && user.firstname} {user && user.lastname}
                        </td>
                        <td className="text-sm min-w-[185px] py-8 px-1 text-dark-gray">
                          {user && user.email}
                        </td>
                        <td className="text-sm  py-8 px-1 text-center text-dark-gray">
                          {metadatas.ville}
                        </td>
                        <td className="text-sm py-8 min-w-[100px] px-1 text-dark-gray">
                          {metadatas.address}
                        </td>
                        <td className="w-5 py-8 px-1 min-w-[120px]">
                          <h3 className="text-center text-primary font-medium tex-sm">
                            {metadatas.price.toLocaleString("fr-FR", {
                              style: "currency",
                              currency: "XOF",
                              currencyDisplay: "narrowSymbol",
                            })}
                          </h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {metadatas.agence && (
              <div className="mb flex flex-col mb-4">
                <div className="border border-gray-300 rounded p-5">
                  <h1 className="text-sm font-medium text-dark-gray mb-2">
                    Point de retrait Castor Marché Sénégal Dakar (orange money,
                    free money, wave)
                  </h1>
                  <h2 className="text-sm font-medium text-dark-gray mb-2">
                    Proche de:
                  </h2>
                  <p className="text-gray-500 text-sm mb-2">
                    Keur Baye Niass, Marché Castor
                  </p>
                  <h2 className="text-sm font-medium text-dark-gray mb-2">
                    Address:
                  </h2>
                  <p className="text-gray-500 text-sm mb-2">
                    Castor Villa numéro 32
                  </p>
                  <h2 className="text-md font-medium text-dark-gray mb-2">
                    Coordonné du point de relai:
                  </h2>
                  <p className="text-gray-500 text-sm mb-2">
                    Castor Rue A, Marché Castor 78 600 45 64
                  </p>
                </div>
              </div>
            )}
            <div className="w-full my-5">
              <h1 className="text-xl font-normal text-black mt-14 mb-4 uppercase">
                Produit
              </h1>
              <div className="w-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 pb-6">
                      <th className="text-sm pb-8 font-semibold">Image</th>
                      <th className="text-sm pb-8 font-semibold">
                        Produit Nom
                      </th>
                      <th className="text-sm pb-8 font-semibold">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.map(({ id, image, name, quantity, price }) => (
                      <tr key={id} className="border-b border-gray-200">
                        <td className="text-sm  px-2  text-dark-gray">
                          <div className="w-24 mx-auto">
                            <Image
                              alt="image"
                              src={image[0].url}
                              layout="responsive"
                              width="100%"
                              height="100%"
                              objectFit="contain"
                            />
                          </div>
                        </td>
                        <td className="text-sm font-medium text-center px-2 text-dark-gray">
                          {name}
                        </td>
                        <td className="text-sm font-medium text-center  px-2 text-dark-gray">
                          {quantity} x{" "}
                          {Number(price.toFixed(2)).toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "XOF",
                            currencyDisplay: "narrowSymbol",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[350px] p-5 bg-gray-100 flex flex-col ">
            <div className="flex border-b pb-4 justify-between">
              <h1 className="uppercase text-dark-gray  text-base font-bold">
                Produit
              </h1>

              <h1 className="uppercase text-dark-gray  text-base font-bold">
                Sous-total
              </h1>
            </div>
            {item.map(({ id, name, quantity, price }) => (
              <div key={id} className="flex py-4 border-b justify-between">
                <p className="text-sm text-gray-500">
                  {name} x {quantity}
                </p>
                <p className="text-sm text-gray-500">
                  {price.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                    currencyDisplay: "narrowSymbol",
                  })}
                </p>
              </div>
            ))}
            <div className="flex py-4 border-b justify-between">
              <p className="text-sm text-gray-500">Livraison</p>
              <p className="text-sm text-gray-500">
                {metadatas.shipping
                  ? metadatas.price.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                      currencyDisplay: "narrowSymbol",
                    })
                  : Number("0").toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                      currencyDisplay: "narrowSymbol",
                    })}
              </p>
            </div>
            <div className="flex py-4 border-b justify-between">
              <h1 className="text-lg font-medium text-dark-gray">Total</h1>
              <h1 className="text-lg font-semibold text-primary">
                {metadatas.shipping
                  ? (metadatas.price + total).toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                      currencyDisplay: "narrowSymbol",
                    })
                  : total.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                      currencyDisplay: "narrowSymbol",
                    })}
              </h1>
            </div>
            <div className="py-5 px-6 bg-primary my-5">
              <p className="text-white text-sm leading-[1.6]">
                Désolé, il semble qu’il n’y a pas de méthodes de paiement
                disponibles pour votre état. Veuillez communiquer avec nous si
                vous avez besoin d’aide ou souhaitez prendre d’autres
                dispositions.
              </p>
            </div>

            <button
              className="text-white font-bold flex items-center px-3 justify-center uppercase bg-primary text-xs py-4 rounded-full my-7 hover:bg-secondary"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading && <Loading />}
              Confirmez votre commande
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrderScreen;
