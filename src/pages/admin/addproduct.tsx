import AddProductScreen from "@/components/admin/AddProductScreen";
import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import SEO from "@/components/Seo";
import { ToastContainer } from "react-toastify";
import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getCookie } from "store/actions/auth";
import { getUser, reset, logout } from "store/reducers/auth/index";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { useRouter } from "next/router";

interface IProps {
  token: string;
}

const Addproduct: FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const { token, isError } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (props.token) {
      dispatch(logout());
      router.push("/login");
    }
    if (token) {
      dispatch(getUser(token.accessToken));
    }
    if (isError) {
      dispatch(reset());
    }
  }, [dispatch, props, isError, router]);
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <BannerImg />
      <AddProductScreen />
      <ToastContainer />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
    </Layout>
  );
};

export default Addproduct;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token: string = getCookie("token", context.req);

  if (token) {
    if (jwtDecode<any>(token).exp < Date.now() / 1000) {
      return {
        props: {
          token,
          white: true,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: { white: true } };
};
