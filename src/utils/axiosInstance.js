import axios from "axios";
import { baseUrl } from "../constants/env";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
