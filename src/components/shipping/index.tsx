import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { Item, Metadata, useCart } from "react-use-cart";

const ShippingScreen = () => {
  const options = [
    {
      value: "Bargny",
      label: "Bargny",
    },
    {
      value: "Centenaire",
      label: "Centenaire",
    },
    {
      value: "Diamniadio",
      label: "Diamniadio",
    },
    {
      value: "Grand Mbao",
      label: "Grand Mbao",
    },
    {
      value: "Grand Yoff",
      label: "Grand Yoff",
    },
    {
      value: "Guédiawaye",
      label: "Guédiawaye",
    },
    {
      value: "HLM",
      label: "HLM",
    },
    {
      value: "HLM Grand Yoff",
      label: "HLM Grand Yoff",
    },
    {
      value: "Keur Massar",
      label: "Keur Massar",
    },
    {
      value: "Maristes",
      label: "Maristes",
    },
    {
      value: "Medina",
      label: "Medina",
    },
    {
      value: "Mermoz",
      label: "Mermoz",
    },
    {
      value: "Ngor - Almadie",
      label: "Ngor - lmadie",
    },
    {
      value: "Ouakam",
      label: "Ouakam",
    },
    {
      value: "Ouest foire",
      label: "Ouest foire",
    },
    {
      value: "Parcelles Assainies",
      label: "Parcelles Assainies",
    },
    {
      value: "Pikine",
      label: "Pikine",
    },
    {
      value: "Pikine Icotaf",
      label: "Pikine Icotaf",
    },
    {
      value: "Plateau",
      label: "Plateau",
    },
    {
      value: "Rufisque",
      label: "Rufisque",
    },
    {
      value: "Sicap Baobab",
      label: "Sicap Baobab",
    },
    {
      value: "Soprim",
      label: "Soprim",
    },
    {
      value: "Thiaroye sur mer",
      label: "Thiaroye sur mer",
    },
    {
      value: "Yeumbeul",
      label: "Yeumbeul",
    },
    {
      value: "Yoff",
      label: "Yoff",
    },
    {
      value: "Zac Mbao",
      label: "Zac Mbao",
    },
    {
      value: "Castors",
      label: "Castors",
    },
  ];
  const prices: any = {
    Bargny: 1250,
    Centenaire: 5000,
    Diamniadio: 6000,
    "Grand Mbao": 6500,
    "Grand Yoff": 1350,
    Guédiawaye: 5500,
    HLM: 1500,
    "HLM Grand Yoff": 7000,
    "Keur Massar": 7500,
    Maristes: 1300,
    Medina: 2000,
    Mermoz: 2500,
    "Ngor - Almadie": 2550,
    Ouakam: 3000,
    "Ouest foire": 3500,
    "Parcelles Assainies": 2500,
    Pikine: 3000,
    "Pikine Icotaf": 2530,
    Plateau: 2500,
    Rufisque: 5000,
    "Sicap Baobab": 3500,
    Soprim: 2500,
    "Thiaroye sur mer": 3000,
    Yeumbeul: 1250,
    Yoff: 2500,
    "Zac Mbao": 3500,
    Castors: 1000,
  };
  const styles = {
    control: (base: any, state: any) => ({
      ...base,
      border: "solid 1px #efefef",
      borderRadius: "0",
      height: "42px",
      "&:hover": {
        border: "solid 1px #efefef",
      },
      "&:focus": {
        // outline: "none",
        border: "none",
      },
      "&:active": {
        border: "none",
        outline: "none",
      },
    }),
  };
  const theme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#a8b324",
        primary: "#0A472E",
      },
    };
  };

  const [checkShip, setCheckShip] = useState<boolean>(true);
  const [checkAgence, setCheckAgence] = useState<boolean>(false);
  const [shippingPrice, setChippingPrice] = useState(1200);
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState<Item[]>([]);
  const [region, setRegion] = useState("");
  const [ville, setVille] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { items, cartTotal, setCartMetadata, metadata } = useCart();
  const [metadatas, setMetadatas] = useState<Metadata>({});
  const router = useRouter();

  useEffect(() => {
    setTotal(cartTotal);
    setItem(items);
    setMetadatas(metadata!);
    if (Object.keys(metadata!).length !== 0) {
      setRegion(metadatas.region);
      setVille(metadatas.ville);
      setCheckShip(metadatas.shipping);
      setCheckAgence(metadatas.agence);
      setAddress(metadatas.address);
      setPhone(metadatas.phone);
    }
  }, [cartTotal, items, metadata, metadatas]);

  const onSubmit = () => {
    if (!region || !address || !phone || !shippingPrice) {
      toast.error("Remplissez les champs obligatoires");
    } else {
      setCartMetadata({
        shipping: checkShip,
        agence: checkAgence,
        price: checkShip ? shippingPrice : 0,
        region,
        ville: checkShip && ville,
        address,
        phone,
      });
      router.push("/order/placeorder");
    }
  };

  return (
    <section>
      <div className="containers mb-48 mt-11">
        <div className="flex mt-3 mb-8 justify-around border-b pb-3">
          <Link href="/login">
            <button
              className={`${
                router.pathname === "/cart/shipping"
                  ? "!text-dark-gray font-medium"
                  : "text-gray-400 font-normal "
              } uppercase`}
            >
              Se Connecter
            </button>
          </Link>
          <Link href="/cart/shipping">
            <button
              className={`${
                router.pathname === "/cart/shipping"
                  ? "!text-dark-gray font-medium"
                  : "text-gray-400 font-normal"
              } uppercase  `}
            >
              Livraison
            </button>
          </Link>
          {/* <Link href="/order/placeorder"> */}
          <button
            className={`${
              router.pathname === "/order/placeorder"
                ? "!text-dark-gray font-medium"
                : "text-gray-400 font-normal"
            } uppercase `}
          >
            Finalisez La Commande
          </button>
          {/* </Link> */}
        </div>
        <h1 className="text-[25px] font-normal mb-12 uppercase ">
          LIVRAISON:{" "}
        </h1>
        <div className="flex justify-between  flex-col md:flex-row">
          <form className="max-w-[730px] mb-7 md:mb-0 px-[20px] px- w-full">
            <div className="mb-3 flex flex-col">
              <label className="text-sm text-dark-gray mb-2" htmlFor="">
                Region <span className="text-red-700">*</span>{" "}
              </label>
              {region === "" && (
                <span className="text-red-600 text-sm mb-2">
                  Champ ne doit pas être vide
                </span>
              )}
              <Select
                options={[{ value: "Dakar", label: "Dakar" }]}
                styles={styles}
                className={
                  region === "" ? "border-red-700 border select" : "select"
                }
                theme={theme}
                value={{
                  label: region,
                  value: region,
                }}
                onChange={(e: any) => setRegion(e.value)}
                instanceId="region"
              />
            </div>
            <div className="mb-3 flex flex-col">
              <div className="text-sm text-dark-gray mb-2">
                Livraison <span className="text-red-700">*</span>
              </div>
              <div className="flex  mb-2">
                <div className="flex items-center flex-row-reverse mr-2 ">
                  <label
                    className="text-sm cursor-pointer font-medium ml-3 "
                    htmlFor="livraison"
                  >
                    Livraison à domicile
                  </label>
                  {checkShip !== undefined && (
                    <input
                      type="checkbox"
                      id="livraison"
                      name="livraison"
                      checked={checkShip}
                      onChange={(e) => {
                        setCheckShip(e.target.checked);
                        setCheckAgence(!e.target.checked);
                      }}
                      className="form-checkbox w-4 h-4 rounded border-secondary border-2 text-primary shadow-sm focus:border-secondary focus:ring focus:ring-offset-0 focus:ring-green-400 focus:ring-opacity-50"
                    />
                  )}
                </div>
                <div className="flex items-center flex-row-reverse ml-2 cursor-pointer">
                  <label
                    className="text-sm font-medium ml-3 cursor-pointer"
                    htmlFor="agence"
                  >
                    Retrait en agence
                  </label>
                  {checkAgence !== undefined && (
                    <input
                      type="checkbox"
                      id="agence"
                      name="agence"
                      checked={checkAgence}
                      onChange={(e) => {
                        setCheckAgence(e.target.checked);
                        setCheckShip(!e.target.checked);
                      }}
                      className="form-checkbox w-4 h-4 rounded border-secondary border-2 text-primary shadow-sm focus:border-secondary focus:ring focus:ring-offset-0 focus:ring-green-400 focus:ring-opacity-50"
                    />
                  )}
                </div>
              </div>
            </div>
            {checkAgence && (
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

            {checkShip && (
              <div className="mb-3 flex flex-col">
                <label className="text-sm text-dark-gray mb-2" htmlFor="">
                  Départements <span className="text-red-700">*</span>{" "}
                </label>
                {checkShip && ville === "" && (
                  <span className="text-red-600 text-sm mb-2">
                    Champ ne doit pas être vide
                  </span>
                )}
                <Select
                  options={options}
                  styles={styles}
                  className={
                    checkShip && ville === ""
                      ? "border border-red-600 select"
                      : "select"
                  }
                  theme={theme}
                  value={{
                    label: ville,
                    value: ville,
                  }}
                  onChange={(e: any) => {
                    setChippingPrice(prices[e.value]);
                    setVille(e.value);
                  }}
                  instanceId="Departements"
                />
              </div>
            )}
            <div className="flex flex-col w-full">
              <label htmlFor="" className="text-sm text-dark-gray mb-2">
                Address <span className="text-red-700">*</span>
              </label>
              {address === "" && (
                <span className="text-red-600 text-sm mb-2">
                  Champ ne doit pas être vide
                </span>
              )}
              {address !== undefined && (
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  className={`w-full border-gray-200 focus:border-gray-200 focus:ring-0 ${
                    metadatas &&
                    !metadatas.address &&
                    address === "" &&
                    "border border-red-600"
                  }`}
                />
              )}
            </div>
            <div className="flex flex-col mt-4 w-full">
              <label htmlFor="" className="text-sm text-dark-gray mb-2">
                Numero de tel. <span className="text-red-700">*</span>
              </label>
              {metadatas && !metadatas.phone && phone === "" && (
                <span className="text-red-600 text-sm mb-2">
                  Champ ne doit pas être vide
                </span>
              )}
              {phone !== undefined && (
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className={`w-full border-gray-200 focus:border-gray-200 focus:ring-0 ${
                    phone === "" && "border-red-600 border"
                  }`}
                />
              )}
            </div>
          </form>
          <div className="w-full max-w-[400px] p-5 bg-gray-100 flex flex-col ">
            <div className="flex border-b pb-4 justify-between">
              <h1 className="uppercase text-dark-gray  text-base font-bold">
                Product
              </h1>
              <h1 className="uppercase text-dark-gray  text-base font-bold">
                Subtotal
              </h1>
            </div>
            {item.map(({ name, quantity, price, id }) => (
              <div key={id} className="flex py-4 border-b justify-between">
                <p className="text-sm text-gray-500">
                  {name} <span className="text-dark-gray">x {quantity}</span>
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
              <p className="text-[15px] text-[#2b2b2b]">Sous total</p>
              <p className="text-sm text-primary text-normal">
                {total.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "XOF",
                  currencyDisplay: "narrowSymbol",
                })}
              </p>
            </div>
            <div className="flex py-4 border-b justify-between">
              <p className="text-[15px] text-[#2b2b2b]">Montant Livraison</p>
              <p className="text-sm text-primary text-normal">
                {checkShip
                  ? shippingPrice.toLocaleString("fr-FR", {
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
                {checkShip
                  ? (total + shippingPrice).toLocaleString("fr-FR", {
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
              onClick={onSubmit}
              className="text-white font-bold uppercase bg-primary text-xs py-4 rounded-full my-7 hover:bg-secondary"
            >
              Faite votre commande
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingScreen;
