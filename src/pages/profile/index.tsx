import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import ProfileScreen from "@/components/Profile/ProfileScreen";
import SEO from "@/components/Seo";
import { useAppSelector } from "@/hooks/index";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { wrapper } from "store";
import { getCookie } from "store/actions/auth";
import { logout, getUser } from "store/reducers/auth";
import { getAllProducts } from "store/reducers/products/productSlice";

const Profile = () => {
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
      <ProfileScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default Profile;
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
