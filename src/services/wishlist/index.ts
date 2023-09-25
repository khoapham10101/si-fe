import { Wishlist } from "@/types/wishlist";
import axiosRequest from "../api";
import { GetWishlistResponse } from "./type";
import { PaginationPayload } from "@/types/common";

export const WishlistService = {
  async getWishlists(
    pagination?: PaginationPayload
  ): Promise<GetWishlistResponse> {
    const { data } = await axiosRequest.post<GetWishlistResponse>(
      "/wishlist",
      pagination && { pagination }
    );
    return data;
  },

  async createWishlist(productId: number): Promise<Wishlist> {
    const { data } = await axiosRequest.post<Wishlist>(
      `/wishlist/create/${productId}`
    );
    return data;
  },

  async deleteWishlist(id: number): Promise<any> {
    return axiosRequest.delete(`/wishlist/delete/${id}`);
  },
};
