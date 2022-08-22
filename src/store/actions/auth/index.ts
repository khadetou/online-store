import axios from "axios";
import cookie from "js-cookie";
import { API_URL } from "@/utils/index";

const getUser = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${API_URL}/auth/user`, config);
  return { data, token };
};

const updateUser = async (token: string, profileData: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${API_URL}/auth/user/profile`,
    profileData,
    config
  );
  return data;
};

const register = async (userData: any) => {
  const { data } = await axios.post(`${API_URL}/auth/signup`, userData);
  return data;
};

const login = async (userData: any) => {
  const { data } = await axios.post(`${API_URL}/auth/signin`, userData);
  if (data) {
    setCookie("token", data.accessToken);
    localStorage.setItem("token", JSON.stringify(data));
  }

  return data;
};

const logout = () => {
  removeCookie("token");
  localStorage.removeItem("token");
};

// FORGOT PASSWORD
const forgotPassword = async (email: string) => {
  const { data } = await axios.post(`${API_URL}/auth/forgot-password`, {
    email,
  });
  return data;
};

// RESET PASSWORD
const resetPassword = async (token: string, password: string) => {
  const { data } = await axios.put(`${API_URL}/auth/confirm-email/${token}`, {
    password,
  });
  return data;
};

// SEND MESSAGE
const sendMessage = async (messageData: any) => {
  const { data } = await axios.post(
    `${API_URL}/auth/send-message`,
    messageData
  );
  return data;
};

//SET COOKIE

export const setCookie = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  }
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: any) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c: any) => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return undefined;
  }

  return rawCookie.split("=")[1];
};

export const getCookie = (key: string, req: any) => {
  return typeof window !== "undefined"
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const authService = {
  register,
  logout,
  login,
  getUser,
  getCookie,
  removeCookie,
  setCookie,
  forgotPassword,
  resetPassword,
  updateUser,
  sendMessage,
};

export default authService;
