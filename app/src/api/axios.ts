import axios from "axios";

const BASE_URL = "http://localhost:3500/api";

const axiosInstace = axios.create({ baseURL: BASE_URL });

const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { axiosInstace, privateAxios };
