import BannerImg from "@/components/Banner/BannerImg";
import ShippingScreen from "@/components/shipping";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import SEO from "@/components/Seo";
import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { useAppSelector } from "@/hooks/index";
import React, { useEffect, useState } from "react";
import { getCookie } from "store/actions/auth";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { wrapper } from "store";
import { getUser, logout } from "store/reducers/auth";

const Shipping = () => {
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
      <Header open={open} setOpen={setOpen} />
      <SEO />
      <BannerImg />
      <ShippingScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default Shipping;
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context): Promise<any> => {
    const token: string = getCookie("token", context.req);

    if (token) {
      if (jwtDecode<any>(token).exp < Date.now() / 1000) {
        await store.dispatch<any>(logout());
      } else {
        await store.dispatch<any>(getUser(token));
      }
    }
  });
