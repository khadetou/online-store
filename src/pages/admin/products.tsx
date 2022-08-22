import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import SEO from "@/components/Seo";
import ProductScreen from "@/components/admin/ProdutScreen";
import { getAllProducts } from "store/reducers/products/productSlice";
import { GetServerSideProps } from "next";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser, reset, logout } from "store/reducers/auth/index";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { ToastContainer } from "react-toastify";
import { getCookie } from "store/actions/auth";
import jwtDecode from "jwt-decode";
import { wrapper } from "store";
import ReactPaginate from "react-paginate";

interface IProducts {
  token: string;
}

const Products: FC<IProducts> = (props) => {
  const dispatch = useAppDispatch();
  const { pages, page } = useAppSelector((state) => state.products);

  const { token, isError } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    if (isError) {
      dispatch(reset());
    }
  }, [dispatch, isError, router, token]);
  const [open, setOpen] = useState(false);
  const onPageChange = (selected: any) => {
    router.push(`/admin/products?pageNumber=${selected.selected + 1}`);
  };
  return (
    <Layout>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <BannerImg />
      <ProductScreen />
      <ToastContainer />
      <ReactPaginate
        previousLabel={"PRECEDANT"}
        nextLabel={"SUIVANT"}
        containerClassName={
          "paginationBttns containers flex justify-center mb-5 py-2"
        }
        onPageChange={onPageChange}
        previousLinkClassName={
          "previousBttn m-[8px] !bg-white text-[#8f8f8f] hover:text-secondary !text-sm font-semibold"
        }
        nextLinkClassName={
          "nextBttn m-[8px] rounded-full text-[#8f8f8f] !bg-white hover:text-secondary !text-sm font-semibold"
        }
        disabledClassName={"paginationDisabled hidden"}
        activeClassName={"paginationEnabled"}
        pageCount={pages}
        selectedPageRel={page}
      />
      <Footer bgColor="!bg-primary" textColor="!text-primary" />
    </Layout>
  );
};

export default Products;
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
  });
