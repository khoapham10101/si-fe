import { Product } from "@/types/product";
import { Module } from "vuex";

export interface CartItem extends Product {
  total: number;
}

export interface CartState {
  total: number;
  data: CartItem[];
}

const store: Module<CartState, any> = {
  namespaced: true,
  state: {
    total: 0,
    data: [],
  },
  mutations: {
    ADD_TO_CART(state, value: CartItem) {
      state.total = state.total + value.total;
      const productAdded = state.data.find((item) => item.id === value.id);
      if (productAdded) {
        productAdded.total = productAdded.total + value.total;
      } else {
        state.data.push(value);
      }
    },
  },
  getters: {
    carts: (state) => {
      return state;
    },
  },
  actions: {
    addToCart({ commit }, payload: CartItem) {
      commit("ADD_TO_CART", payload);
    },
  },
};

export { store as cart };
