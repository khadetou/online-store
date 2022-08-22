import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import ForgotScreen from "@/components/password/ForgotScreen";
import SEO from "@/components/Seo";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const Forgot = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <BannerImg />
      <ForgotScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default Forgot;
