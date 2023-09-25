import { Product } from "./product";
import { User } from "./user";

export interface Wishlist {
  id: number;
  userId: number;
  user: User;
  product_id: number;
  product: Product;
  created_at: string;
  updated_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
}
