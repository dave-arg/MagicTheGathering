/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';
import Card from "../model/Card";


export interface CardsService {
  getCards: () => Promise<Card []>;
}

export class CardsServiceImplementation implements CardsService {

  private axiosInstance = setupCache(axios.create({
    baseURL: "https://api.magicthegathering.io/v1/",
  }),{ ttl: 35000,  });

  constructor() {
    this.axiosInstance.interceptors.response.use(
        (response: CacheAxiosResponse) => {
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
  }


  async getCards(): Promise<Card[]> {
    try{
    const response = await this.axiosInstance.get("/cards");
    return response.data;
    }catch(error){
      console.error(error);
      return [];
  }
}
}
