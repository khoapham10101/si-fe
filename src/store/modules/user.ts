import { UserStatus } from "@/types/auth";
import { Module } from "vuex";

export interface UserState {
  listUserStatus: UserStatus[] | null;
}

const store: Module<UserState, any> = {
  namespaced: true,
  state: {
    listUserStatus: null,
  },
  mutations: {
    UPDATE_LIST_USER_STATUS(state, value: UserStatus[] | null) {
      state.listUserStatus = value;
    },
  },
  getters: {
    listUserStatus: (state) => {
      return state.listUserStatus;
    },
  },
  actions: {
    updateListUserStatus({ commit }, payload: UserStatus[] | null) {
      commit("UPDATE_LIST_USER_STATUS", payload);
    },
  },
};

export { store as user };
