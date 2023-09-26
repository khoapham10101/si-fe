import { Brand, BrandDropdown, Product } from "@/types/product";
import { Wishlist } from "@/types/wishlist";
import { Module } from "vuex";

export interface ProductState {
  brandsDropdown: BrandDropdown[] | null;
  productsWishlist: Product[] | null;
  isWishlistLoading: boolean;
}

const store: Module<ProductState, any> = {
  namespaced: true,
  state: {
    brandsDropdown: null,
    productsWishlist: null,
    isWishlistLoading: false,
  },
  mutations: {
    UPDATE_BRANDS_DROPDOWN(state, value: BrandDropdown[] | null) {
      state.brandsDropdown = value;
    },
    UPDATE_PRODUCTS_WISHLIST(state, value: Product[] | null) {
      state.productsWishlist = value;
    },
    UPDATE_IS_WISHLISTLOADING(state, value: boolean) {
      state.isWishlistLoading = value;
    },
  },
  getters: {
    brandsDropdown: (state) => {
      return state.brandsDropdown;
    },
    productsWishlist: (state) => {
      return state.productsWishlist;
    },
    isWishlistLoading: (state) => {
      return state.isWishlistLoading;
    },
  },
  actions: {
    updateBrandsDropdown({ commit }, payload: BrandDropdown[] | null) {
      commit("UPDATE_BRANDS_DROPDOWN", payload);
    },
    updateProductsWishlist({ commit }, payload: Product[] | null) {
      commit("UPDATE_PRODUCTS_WISHLIST", payload);
    },
    updateIsWishListLoading({ commit }, payload: boolean) {
      commit("UPDATE_IS_WISHLISTLOADING", payload);
    },
  },
};

export { store as product };
