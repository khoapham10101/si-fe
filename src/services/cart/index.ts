import axiosRequest from "../api";
import {
  CreateCardResponse,
  CreateCartPayload,
  GetCartsResponse,
} from "./type";

export const CartService = {
  async getListCarts(): Promise<GetCartsResponse> {
    const { data } = await axiosRequest.post<GetCartsResponse>("/carts");
    return data;
  },

  async createCart(payload: CreateCartPayload): Promise<CreateCardResponse> {
    const { data } = await axiosRequest.post<CreateCardResponse>(
      "/carts/create",
      payload
    );
    return data;
  },
};
