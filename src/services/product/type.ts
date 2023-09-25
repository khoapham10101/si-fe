import { ApiPaginationResponse } from "@/types/common";
import { Brand, Product } from "@/types/product";

export type GetProductsResponse = ApiPaginationResponse<Product[]>;

export interface CreateProductPayload {
  name: string;
  sku: string;
  description: string;
  warranty_information: string;
  quantity: number;
  price: number;
  brand_id: number;
  images?: File[];
}
