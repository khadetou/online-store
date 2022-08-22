import React, { useEffect, useState } from "react";
import OrderScreen from "@/components/admin/OrderScreen";
import Layout from "@/components/Layout";
import SEO from "@/components/Seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BannerImg from "@/components/Banner/BannerImg";
import { GetServerSideProps } from "next";
import { wrapper } from "store";
import jwtDecode from "jwt-decode";
import { getCookie } from "store/actions/auth";
import { logout, getUser } from "store/reducers/auth";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/index";
import { ToastContainer } from "react-toastify";

const Order = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
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
      <OrderScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default Order;
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
