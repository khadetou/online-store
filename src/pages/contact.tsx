import BannerImg from "@/components/Banner/BannerImg";
import ContactScreen from "@/components/Contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import SEO from "@/components/Seo";
import { GetStaticProps } from "next";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const Contact = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <Header open={open} setOpen={setOpen} />
      <SEO />
      <BannerImg />
      <ContactScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default Contact;
export const getStaticProps: GetStaticProps = async (context) => {
  return { props: { white: true } };
};
