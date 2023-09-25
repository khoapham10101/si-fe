import { Cart } from "@/types/cart";
import { Product } from "@/types/product";
import { Module } from "vuex";

// export interface CartItem extends Product {
//   total: number;
// }

export interface CartState {
  data: Cart[];
}

const store: Module<CartState, any> = {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_TO_CART(state, value: Cart) {
      //state.total = state.total + value.total;
      // const productAdded = state.data.find((item) => item.id === value.id);
      // if (productAdded) {
      //   productAdded.total = productAdded.total + value.total;
      // } else {
      //   state.data.push(value);
      // }
    },
    UPDATE_CARTS(state, value: Cart[]) {
      state.data = value;
    },
  },
  getters: {
    carts: (state) => {
      return state;
    },
    cartsTotal: (state) => {
      const result = state.data.reduce((value, cart) => {
        return value + cart.quantity;
      }, 0);
      return result;
    },
  },
  actions: {
    // addToCart({ commit }, payload: CartItem) {
    //   commit("ADD_TO_CART", payload);
    // },
    updateCarts({ commit }, payload: Cart[]) {
      commit("UPDATE_CARTS", payload);
    },
  },
};

export { store as cart };
