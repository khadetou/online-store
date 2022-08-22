import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import LoginScreen from "@/components/Login";
import SEO from "@/components/Seo";
import { GetServerSideProps } from "next";
import { ToastContainer } from "react-toastify";
import React, { FC, useState } from "react";
import { getCookie } from "store/actions/auth";
import jwtDecode from "jwt-decode";

interface LoginProps {
  white: any;
}
const Login: FC<LoginProps> = ({ white }) => {
  // console.log(white);
  const [open, setOpen] = useState(false);
  return (
    <Layout bg="bg-white">
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <BannerImg />
      <LoginScreen />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
      <ToastContainer />
    </Layout>
  );
};

export default Login;
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
  return {
    props: {
      white: true,
    },
  };
};
