import { ApiPaginationResponse } from "@/types/common";
import { Wishlist } from "@/types/wishlist";

export type GetWishlistResponse = ApiPaginationResponse<Wishlist[]>;
