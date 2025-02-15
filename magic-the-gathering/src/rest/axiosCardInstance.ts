/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from "axios";
import Card from "../model/Card";

const axiosCardInstance: AxiosInstance = axios.create({
  baseURL: "https://api.magicthegathering.io/v1",
});

axiosCardInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (Array.isArray(response.data.cards)) {
      response.data = response.data.cards
        .filter((item: any) => item.imageUrl)
        .map((item: any) => {
          return new Card(item.name, item.imageUrl);
        });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosCardInstance;
