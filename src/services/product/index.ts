import { AxiosResponse } from "axios";
import axiosRequest from "../api";
import { GetProductsResponse } from "./type";
import { Product } from "@/types/product";
import { PaginationPayload } from "@/types/common";

export const ProductService = {
  async getPublicProducts(
    pagination?: PaginationPayload
  ): Promise<GetProductsResponse> {
    const { data } = await axiosRequest.post<GetProductsResponse>(
      "/public/products",
      pagination && { pagination }
    );
    return data;
  },

  async getPublicProductDetail(id: number | string): Promise<Product> {
    const { data } = await axiosRequest.get<Product>(
      `/public/products/single/${id}`
    );
    return data;
  },
};
