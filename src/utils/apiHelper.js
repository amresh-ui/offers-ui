import axios from "axios";
import {
  API_KEY,
  accountListApi,
  authApi,
  baseUrl,
  cashbackDetailsApi,
  clientId,
  clientSecret,
  devEnv,
  marketPlaceApi,
  offersApi,
  offerDetailsApi,
  userDetailsApi,
  userDetailsEnrollApi,
  userDetailsUpdate,
} from "../constants/env";
import axiosInstance from "./axiosInstance";

export const getTokenApi = () => {
  const tokenHeader = {
    headers: {
      Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return new Promise((resolve, reject) => {
    axios.post(authApi, null, tokenHeader)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export const getAccountsApi = (token, cisId) => {
  const accountsHeader = {
    headers: {
      Authorization: `Bearer ${token}`, 
      "x-AuthType": "SignonUIdPswdRole",
      "x-AuthCredentials": "s685967:jorge@123:CSR",
      // "x-api-key": X_API_KEY,
      "x-api-key": "aSGlKpyJTeATvrupdyHa86mqQ1GYjnW2IMSjTtFc",
      // "x-client-traceid": Date.now(),
      BankIdType: "FIParty",
      BankId: "001",
      AppCode: "MIBANCO",
      CustPermId: cisId,
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance.get(accountListApi, accountsHeader)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};


export const getUserDetailApi = (cisId) => {
  return new Promise((resolve, reject) => {
    axiosInstance.get(
      `${baseUrl}${devEnv}${marketPlaceApi}${userDetailsApi}`,
      {
        headers: {
          "x-api-key": API_KEY,
          CISId: cisId
        },
      }
    )
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

export const userEnrollApi = (reqBody) => {
  return new Promise((resolve, reject) => {
    axiosInstance.post(
      `${baseUrl}${devEnv}${marketPlaceApi}${userDetailsEnrollApi}`,
      reqBody,
      {
        headers: {
          "x-api-key": API_KEY,
          "x-idem-key": reqBody.TrackingCode,
        },
      }
    )
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

export const getOfferListApi = () => {
  return new Promise((resolve, reject) => {
    axiosInstance.get(`${baseUrl}${devEnv}${marketPlaceApi}${offersApi}`, {
      headers: {
        "x-api-key": API_KEY,
      },
    })
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

export const getOfferDetailApi = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance.get(
      `${baseUrl}${devEnv}${marketPlaceApi}${offerDetailsApi}`,
      {
        headers: {
          "x-api-key": API_KEY,
          MerchantId: id
        },
      }
    )
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

export const getCashbackApi = (trackingCode) => {
  return new Promise((resolve, reject) => {
    axiosInstance.get(
      `${baseUrl}${devEnv}${marketPlaceApi}${cashbackDetailsApi}`,
      {
        headers: {
          "x-api-key": API_KEY,
          TrackingCode: trackingCode,
        },
      }
    )
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

export const updateUserDetails = (reqBody, cisid, trackingCode) => {
  return new Promise((resolve, reject) => {
    axiosInstance.put(
      `${baseUrl}${devEnv}${marketPlaceApi}${userDetailsUpdate}`,
      reqBody,
      {
        headers: {
          "x-api-key": API_KEY,
          "x-idem-key": trackingCode,
          CISID: cisid
        },
      }
    )
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};
