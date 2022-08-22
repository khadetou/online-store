import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import EditScreen from "@/components/Profile/EditScreen";
import SEO from "@/components/Seo";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { wrapper } from "store";
import { getCookie } from "store/actions/auth";
import { logout, getUser } from "store/reducers/auth";

const Edit = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <BannerImg />
      <EditScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default Edit;
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
