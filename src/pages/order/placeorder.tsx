import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import PlaceOrderScreen from "@/components/OrderScreen/placeOrderScreen";
import SEO from "@/components/Seo";
import { useAppSelector } from "@/hooks/index";
import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { wrapper } from "store";
import { getCookie } from "store/actions/auth";
import { getUser, logout } from "store/reducers/auth";

const Placeorder = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push({
        pathname: "/login",
        query: { from: router.pathname },
      });
    }
  }, [isAuthenticated, router]);
  return (
    <Layout>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <BannerImg />
      <PlaceOrderScreen />
      <ToastContainer />
      <Footer />
    </Layout>
  );
};

export default Placeorder;
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context): Promise<any> => {
    const token: string = getCookie("token", context.req);

    if (token) {
      if (jwtDecode<any>(token).exp < Date.now() / 1000) {
        await store.dispatch<any>(logout());
      } else {
        await store.dispatch<any>(getUser(token));
      }
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  });
