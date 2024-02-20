import axios from "axios";

const BASE_URL = "https://basic-auth-324k.onrender.com/api";

const axiosInstace = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export { axiosInstace, privateAxios };
