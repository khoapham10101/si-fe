import { LoginResponse } from "@/services/auth/type";
import { User } from "@/types/user";
import { Module } from "vuex";

export interface AuthState {
  access_token: string;
  profile: User | null;
  isAuthenticated: boolean;
  isLogoutLoading: boolean;
}

const store: Module<AuthState, any> = {
  namespaced: true,
  state: {
    access_token: "",
    profile: null,
    isAuthenticated: false,
    isLogoutLoading: false,
  },
  mutations: {
    UPDATE_AUTH_STATE(state, value: AuthState) {
      state.access_token = value.access_token;
      state.isAuthenticated = value.isAuthenticated;
      state.profile = value.profile;
    },
    RESET_AUTH(state) {
      state.access_token = "";
      state.profile = null;
      state.isAuthenticated = false;
    },
    UPDATE_LOGOUT_LOADING(state, value: boolean) {
      state.isLogoutLoading = value;
    },
    UPDATE_PROFILE(state, value: User | null) {
      state.profile = value;
    },
  },
  getters: {
    authState: (state) => {
      return state;
    },
    isLogoutLoading: (state) => {
      return state.isLogoutLoading;
    },
    profile: (state) => {
      return state.profile;
    },
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
  },
  actions: {
    updateAuth({ commit }, payload: AuthState) {
      commit("UPDATE_AUTH_STATE", payload);
    },
    resetAuth({ commit }) {
      commit("RESET_AUTH");
    },
    updateIsLogoutLoading({ commit }, payload: boolean) {
      commit("UPDATE_LOGOUT_LOADING", payload);
    },
    updateProfile({ commit }, payload: User | null) {
      commit("UPDATE_PROFILE", payload);
    },
  },
};

export { store as auth };
