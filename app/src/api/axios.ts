import axios from "axios";

const BASE_URL = "https://basic-auth-324k.onrender.com/api";

const axiosInstace = axios.create({ baseURL: BASE_URL });

const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { axiosInstace, privateAxios };
