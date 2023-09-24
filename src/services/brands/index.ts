import { PaginationPayload } from "@/types/common";
import axiosRequest from "../api";
import {
  CreateBrandPayload,
  CreateBrandResponse,
  GetBrandsDropdownPayload,
  GetBrandsDropdownResponse,
  GetBrandsResponse,
} from "./type";

export const BrandService = {
  async getListBrands(
    pagination?: PaginationPayload
  ): Promise<GetBrandsResponse> {
    const { data } = await axiosRequest.post<GetBrandsResponse>(
      "/brands",
      pagination && { pagination }
    );
    return data;
  },

  async getBrandsDropdown(
    payload: GetBrandsDropdownPayload
  ): Promise<GetBrandsDropdownResponse> {
    const { data } = await axiosRequest.post<GetBrandsDropdownResponse>(
      "/brands/dropdown",
      payload
    );
    return data;
  },

  async createBrand(payload: CreateBrandPayload): Promise<CreateBrandResponse> {
    const { data } = await axiosRequest.post<CreateBrandResponse>(
      "/brands/create",
      payload
    );
    return data;
  },

  async editBrand(
    id: number,
    payload: CreateBrandPayload
  ): Promise<CreateBrandResponse> {
    const { data } = await axiosRequest.patch<CreateBrandResponse>(
      `/brands/update/${id}`,
      payload
    );
    return data;
  },

  async deleteBrand(id: number): Promise<any> {
    return axiosRequest.delete(`/brands/delete/${id}`);
  },
};
