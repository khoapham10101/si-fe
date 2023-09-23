import { ApiPaginationResponse } from "@/types/common";
import { Product } from "@/types/product";

export type GetProductsResponse = ApiPaginationResponse<Product[]>;
