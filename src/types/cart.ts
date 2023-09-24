import { Product } from "./product";

export interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  product: Product;
  quantity: number;
  created_at: string;
  updated_at: string;
}
