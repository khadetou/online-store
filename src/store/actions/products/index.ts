import axios from "axios";
import { API_URL } from "@/utils/index";
// CREATE PRODUCTS
const createProducts = async (productData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(`${API_URL}/products`, productData, config);
  return data;
};

// GET ALL PRODUCTS

const getAllProducts = async (
  req?: any,
  keyword: string = "",
  pageNumber = ""
) => {
  // const { origin } = absoluteUrl(req);
  // console.log(origin);

  const { data } = await axios.get(
    `${API_URL}/products?keyword=${keyword}&pageNumber=${pageNumber}`
  );
  console.log(data);
  return data;
};

// UPDATE PRODUCT
const updateProduct = async (productData: any, token: any, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${API_URL}/products/${id}`,
    productData,
    config
  );

  return data;
};

// GET PRODUCT BY ID
const getProductById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};

// DELETE PRODUCT
const deleteProduct = async (id: string, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(`${API_URL}/products/${id}`, config);
  return data;
};

export const createReview = async (
  id: string,
  reviewData: any,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(
    `${API_URL}/products/${id}/reviews`,
    reviewData,
    config
  );
  return data;
};

const productsService = {
  createProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createReview,
};
export default productsService;
