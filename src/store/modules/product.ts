import { LoginResponse } from "@/services/auth/type";
import { UserProfile } from "@/types/auth";
import { Brand } from "@/types/product";
import { Module } from "vuex";

export interface ProductState {
  brands: Brand[] | null;
}

const store: Module<ProductState, any> = {
  namespaced: true,
  state: {
    brands: null,
  },
  mutations: {
    UPDATE_BRANDS(state, value: Brand[] | null) {
      state.brands = value;
    },
  },
  getters: {
    brands: (state) => {
      return state.brands;
    },
  },
  actions: {
    updateBrands({ commit }, payload: Brand[] | null) {
      commit("UPDATE_BRANDS", payload);
    },
  },
};

export { store as product };
