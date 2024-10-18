import axios from "axios";
import {
  marketPlaceAuthApi,
  marketPlaceClientId,
  marketPlaceClientSecret,
} from "../constants/env";
import axiosInstance from "../utils/axiosInstance";
import { useContext } from "react";
import { AppContext } from "../AppProvider";

let retryCount = 0;
const useAuth = () => {
  const { setAccessToken } = useContext(AppContext);

  const updateAxiosInstance = (token) => {
    axiosInstance.interceptors.request.use(
      async (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => error
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === "ERR_NETWORK" && retryCount === 0) {
          getToken();
          retryCount = 1;
        }
        return Promise.reject(error);
      }
    );
  };

  const getToken = async (setLoading) => {
    try {
      if (setLoading) {
        setLoading(true);
      }
      const response = await axios.post(marketPlaceAuthApi, null, {
        headers: {
          Authorization: `Basic ${btoa(
            marketPlaceClientId + ":" + marketPlaceClientSecret
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      updateAxiosInstance(response.data.access_token);
      setAccessToken(response.data.access_token);
      if (setLoading) {
        setLoading(false);
      }
    } catch (error) {
      console.log("erro", error);
      if (setLoading) {
        setLoading(false);
      }
    }
  };

  return {
    getToken,
  };
};

export default useAuth;
