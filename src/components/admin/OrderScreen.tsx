import React, { useEffect } from "react";
import Image from "next/image";
import { reset, getOrderById, orderPaid } from "store/reducers/order/index";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading";

const OrderScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading, isError, message, order } = useAppSelector(
    (state) => state.orders
  );
  useEffect(() => {
    dispatch(getOrderById(router.query.id as string));
    if (isError) {
      toast.error(message.message);
      dispatch(reset());
    }
  }, [dispatch, isError, message, router]);

  const paidAction = () => {
    dispatch(orderPaid(router.query.id as string));
  };
  return (
    <section className="mb-10 mt-3">
      <div className="containers">
        <h1 className="text-[25px] font-normal mb-12 uppercase ">
          COMMANDE N°:{" "}
          <span className="text-primary">{order && order._id}</span>
        </h1>

        <div className="flex justify-between  flex-col md:flex-row">
          <div className="max-w-[970px] mr-5 w-full">
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
            <div className="w-full">
              <h1 className="text-xl font-normal text-black mb-4 uppercase">
                Livraison
              </h1>
              <div className="w-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-300 ">
                      <th className="text-sm py-8 font-semibold">Email</th>
                      <th className="text-sm py-8 font-semibold">Nom</th>
                      <th className="text-sm py-8 font-semibold">Ville</th>
                      <th className="text-sm py-8 font-semibold">Address</th>
                      <th className="text-sm py-8 font-semibold">
                        Numéro Tél.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 pb-4">
                      <td className="text-sm py-8 px-1 min-w-[164px] text-dark-gray">
                        {order && order.user.firstname}{" "}
                        {order && order.user.lastname}
                      </td>
                      <td className="text-sm min-w-[185px] py-8 px-1 text-dark-gray">
                        {order && order.user.email}
                      </td>
                      <td className="text-sm  py-8 px-1 text-center text-dark-gray">
                        {order && order.shippingAddress.city}
                      </td>
                      <td className="text-sm py-8 text-center min-w-[189px] px-1 text-dark-gray">
                        {order && order.shippingAddress.address}
                      </td>
                      <td className="w-5 py-8 px-1 text-primary text-sm font-medium min-w-[102px]">
                        {order && order.shippingAddress.phone}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-300 py-6">
                      <th className="text-sm py-8 font-semibold">Livré</th>
                      <th className="text-sm py-8 font-semibold">Payé</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="w-5 py-8 px-1">
                        {order && order.isShipped ? (
                          <div className="text-primary font-medium text-sm flex justify-center bg-[#5fff023e] min-w-[112px] rounded-md px-2  items-center py-1">
                            Livré
                          </div>
                        ) : (
                          <div className="text-red-600 font-medium text-sm flex justify-center bg-[#ff56023e] min-w-[112px] rounded-md px-2  py-1">
                            Non Livré
                          </div>
                        )}
                      </td>
                      <td className="w-5 py-8 px-1">
                        {order && order.isPaid ? (
                          <div className="text-primary font-medium text-sm flex justify-center bg-[#5fff023e] min-w-[112px] rounded-md px-2  items-center py-1">
                            Payé
                          </div>
                        ) : (
                          <div className="text-red-600 font-medium text-sm flex justify-center bg-[#ff56023e] min-w-[112px] rounded-md px-2  py-1">
                            Non Payé
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                    {order &&
                      order.orderItems.map((orderItem: any) => (
                        <tr
                          key={orderItem._id}
                          className="border-b border-gray-200"
                        >
                          <td className="text-sm  px-2  text-dark-gray">
                            <div className="w-24 mx-auto">
                              <Image
                                src={orderItem.image[0].url}
                                alt="produit"
                                layout="responsive"
                                width="100%"
                                height="100%"
                                objectFit="contain"
                              />
                            </div>
                          </td>
                          <td className="text-sm font-medium text-center px-2 text-dark-gray">
                            {orderItem.name}
                          </td>
                          <td className="text-sm font-medium text-center  px-2 text-dark-gray">
                            {orderItem.qty} x {orderItem.price} FCFA
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[350px] p-5 bg-gray-100 flex flex-col h-[650px] ">
            <div className="flex border-b pb-4 justify-between">
              <h1 className="uppercase text-dark-gray  text-base font-bold">
                Produit
              </h1>

              <h1 className="uppercase text-dark-gray  text-base font-bold">
                Sous-total
              </h1>
            </div>
            {order &&
              order.orderItems.map((orderItem: any) => (
                <div
                  key={orderItem._id}
                  className="flex py-4 border-b justify-between"
                >
                  <p className="text-sm text-gray-500">
                    {orderItem.name} x{" "}
                    <span className="text-black">{orderItem.qty}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {orderItem.price} FCFA
                  </p>
                </div>
              ))}
            <div className="flex py-4 border-b justify-between">
              <p className="text-sm text-gray-500">Livraison</p>
              <p className="text-sm text-gray-500">
                {order && order.shippingPrice} FCFA
              </p>
            </div>

            <div className="flex py-4 border-b justify-between">
              <h1 className="text-lg font-medium text-dark-gray">Total</h1>
              <h1 className="text-lg font-semibold text-primary">
                {order && order.totalPrice}
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
              className="text-white font-bold uppercase bg-primary text-xs py-4 rounded-full my-7 hover:bg-secondary flex items-center justify-center"
              onClick={paidAction}
            >
              {isLoading && <Loading />} Commande Payé
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderScreen;
