import { Brand, BrandDropdown } from "@/types/product";
import { Module } from "vuex";

export interface ProductState {
  brandsDropdown: BrandDropdown[] | null;
}

const store: Module<ProductState, any> = {
  namespaced: true,
  state: {
    brandsDropdown: null,
  },
  mutations: {
    UPDATE_BRANDS_DROPDOWN(state, value: BrandDropdown[] | null) {
      state.brandsDropdown = value;
    },
  },
  getters: {
    brandsDropdown: (state) => {
      return state.brandsDropdown;
    },
  },
  actions: {
    updateBrandsDropdown({ commit }, payload: BrandDropdown[] | null) {
      commit("UPDATE_BRANDS_DROPDOWN", payload);
    },
  },
};

export { store as product };
