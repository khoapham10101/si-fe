import { Module } from "vuex";

interface CounterState {
  value: number;
}

const store: Module<CounterState, any> = {
  namespaced: true,
  state: {
    value: 0,
  },
  mutations: {
    INCREASE(state, value) {
      state.value += value;
    },
    DECREASE(state, value) {
      state.value -= value;
    },
  },
  getters: {
    counter: (state) => {
      return state.value;
    },
  },
  actions: {
    increase({ commit }, payload: number) {
      commit("INCREASE", payload);
    },
    decrease({ commit }, payload: number) {
      commit("DECREASE", payload);
    },
  },
};

export { store as counter };
