import { Cart } from "@/types/cart";
import { ApiResponse } from "@/types/common";

export type GetCartsResponse = ApiResponse<Cart[]>;

export interface CreateCartPayload {
  product_id: number;
}

export type CreateCardResponse = ApiResponse<Cart>;
