import { AxiosResponse } from "axios";
import axiosRequest from "../api";
import { CreateProductPayload, GetProductsResponse } from "./type";
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

  async getListProducts(
    pagination?: PaginationPayload
  ): Promise<GetProductsResponse> {
    const { data } = await axiosRequest.post<GetProductsResponse>(
      "/public/products",
      pagination && { pagination }
    );
    return data;
  },

  async createProduct(payload: CreateProductPayload): Promise<Product> {
    const {
      name,
      sku,
      description,
      warranty_information,
      quantity,
      price,
      brand_id,
      images,
    } = payload;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("description", description);
    formData.append("warranty_information", warranty_information);
    formData.append("quantity", quantity.toString());
    formData.append("price", price.toString());
    formData.append("brand_id", brand_id.toString());
    if (images) {
      images.forEach((image) => {
        formData.append("images[]", image);
      });
    }
    const { data } = await axiosRequest.post("/products/create", formData);
    return data;
  },

  async deleteProduct(id: number): Promise<any> {
    return axiosRequest.delete(`/products/delete/${id}`);
  },

  async editProduct(
    id: number,
    payload: CreateProductPayload
  ): Promise<Product> {
    const {
      name,
      sku,
      description,
      warranty_information,
      quantity,
      price,
      brand_id,
      images,
    } = payload;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("description", description);
    formData.append("warranty_information", warranty_information);
    formData.append("quantity", quantity.toString());
    formData.append("price", price.toString());
    formData.append("brand_id", brand_id.toString());
    if (images) {
      images.forEach((image) => {
        formData.append("images[]", image);
      });
    }
    const { data } = await axiosRequest.post(
      `/products/update/${id}`,
      formData
    );
    return data;
  },

  async deleteProductFile(productId: number, path: string): Promise<any> {
    return await axiosRequest.post(`/products/${productId}/deleteImage`, {
      path,
    });
  },
};
