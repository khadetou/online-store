import BannerImg from "@/components/Banner/BannerImg";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import ProductsList from "@/components/Products";
import SEO from "@/components/Seo";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { wrapper } from "store";
import { getCookie } from "store/actions/auth";
import { logout, getUser } from "store/reducers/auth";
import { getAllProducts } from "store/reducers/products/productSlice";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import ScrollToTop from "react-scroll-to-top";
import { BsChevronUp } from "react-icons/bs";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { products, pages, page } = useAppSelector((state) => state.products);

  const router = useRouter();

  const onPageChange = (selected: any) => {
    router.push(`/products?pageNumber=${selected.selected + 1}`);
  };

  return (
    <Layout openModal={openModal} setOpenModal={setOpenModal}>
      <SEO />
      <Header open={open} setOpen={setOpen} />
      <BannerImg />
      <ProductsList
        products={products}
        openModal={openModal}
        setOpenModal={setOpenModal}
        open={open}
        setOpen={setOpen}
      />
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
      <ScrollToTop
        smooth
        className="!bg-primary"
        component={<BsChevronUp className="text-white text-2xl mx-auto" />}
      />
      <Footer bgColor="!bg-primary" textColor="!text-white" />
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
      }
    }
  });
