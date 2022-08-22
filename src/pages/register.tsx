import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import RegisterScreen from "@/components/Register";
import SEO from "@/components/Seo";
import { GetServerSideProps } from "next";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { getCookie } from "store/actions/auth";

const Register = () => {
  const [open, setOpen] = useState(false);
  <BannerImg />;
  return (
    <Layout>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <RegisterScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default Register;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie("token", context.req);
  if (token) {
    if (jwtDecode<any>(token).exp > Date.now() / 1000) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
  return { props: {} };
};
