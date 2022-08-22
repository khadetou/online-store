import Ads from "@/components/Ads";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Intersection from "@/components/Intersection";
import Layout from "@/components/Layout";
import SEO from "@/components/Seo";
import Services from "@/components/Services";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import ProductScreen from "screen/ProductScreen";
import { getUser, logout } from "store/reducers/auth/index";
import { getCookie } from "store/actions/auth";
import jwtDecode from "jwt-decode";
import { wrapper } from "store";
import { getAllProducts } from "store/reducers/products/productSlice";
import ScrollToTop from "react-scroll-to-top";
import { BsChevronUp } from "react-icons/bs";
import { useAppSelector } from "../hooks";

const Home: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Layout openModal={openModal} setOpenModal={setOpenModal} bg="bg-bg-color">
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <Banner />
      <Ads />
      <ProductScreen
        title="Nouveau Produit"
        openModal={openModal}
        setOpenModal={setOpenModal}
        open={open}
        setOpen={setOpen}
        img="https://res.cloudinary.com/didh3wbru/image/upload/v1658049972/Ecommerce/Images/side%20images/h1-banner-5-ok_r7vjkn.jpg"
      />
      <ProductScreen
        title="Meilleur Ventes"
        openModal={openModal}
        setOpenModal={setOpenModal}
        open={open}
        setOpen={setOpen}
        img="https://res.cloudinary.com/didh3wbru/image/upload/v1658946439/Ecommerce/Images/side%20images/h1-banner-7-ok_xob0kn.jpg"
      />
      <Intersection />
      <ProductScreen
        title="Produit Populaire"
        openModal={openModal}
        setOpenModal={setOpenModal}
        open={open}
        setOpen={setOpen}
        img="https://res.cloudinary.com/didh3wbru/image/upload/v1658946470/Ecommerce/Images/side%20images/h1-banner-6-ok_gss8tt.jpg"
      />
      <ProductScreen
        title="Plus Notés"
        openModal={openModal}
        setOpenModal={setOpenModal}
        open={open}
        setOpen={setOpen}
        img="https://res.cloudinary.com/didh3wbru/image/upload/v1658946498/Ecommerce/Images/side%20images/h1-banner-4-ok_ef3fpz.jpg"
      />
      <Category />
      <Services />
      <ScrollToTop
        smooth
        className="!bg-primary"
        component={<BsChevronUp className="text-white text-2xl mx-auto" />}
      />
      <Footer />
    </Layout>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context): Promise<any> => {
    const token: string = getCookie("token", context.req);

    const data = {
      req: context.req,
      keyword: context.query.keyword,
      pageNumber: context.query.pageNumber,
    };
    await store.dispatch<any>(getAllProducts(data));

    if (token) {
      if (jwtDecode<any>(token).exp < Date.now() / 1000) {
        await store.dispatch<any>(logout());
      } else {
        await store.dispatch<any>(getUser(token));
      }
    }
  });
