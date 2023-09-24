import { ApiPaginationResponse, ApiResponse } from "@/types/common";
import { Brand, BrandDropdown } from "@/types/product";

export type GetBrandsResponse = ApiPaginationResponse<Brand[]>;

export interface CreateBrandPayload {
  name: string;
}

export type CreateBrandResponse = ApiResponse<Brand>;

export interface GetBrandsDropdownResponse {
  data: BrandDropdown[];
}

export interface GetBrandsDropdownPayload {
  filters: {
    name: string;
  };
}
