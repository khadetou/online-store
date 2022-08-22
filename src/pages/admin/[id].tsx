import EditProductScreen from "@/components/admin/EditProductScreen";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import SEO from "@/components/Seo";
import { GetServerSideProps } from "next";
import { ToastContainer } from "react-toastify";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { getUser, logout } from "store/reducers/auth/index";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { removeCookie, getCookie } from "store/actions/auth";
import { wrapper } from "store";
import { AnyAction } from "@reduxjs/toolkit";

const EditProduct = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <EditProductScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default EditProduct;
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context): Promise<any> => {
    const token: string = getCookie("token", context.req);
    if (token) {
      if (jwtDecode<any>(token).exp < Date.now() / 1000) {
        await store.dispatch<any>(logout());
      } else {
        await store.dispatch<any>(getUser(token));
        const { auth } = await store.getState();
        if (!auth.token || !auth.user.roles.includes("admin")) {
          return {
            redirect: {
              destination: "/login",
              permanent: false,
            },
          };
        }
      }
    }

    return {
      props: {
        white: true,
      },
    };
  });
