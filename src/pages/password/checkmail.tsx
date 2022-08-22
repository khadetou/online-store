import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import CheckMailScreen from "@/components/password/CheckMail";
import SEO from "@/components/Seo";
import React, { useState } from "react";

const CheckMail = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <BannerImg />
      <CheckMailScreen />
      <Footer />
    </Layout>
  );
};

export default CheckMail;
