/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApiResponse } from "@/types/common";
import axiosRequest from "../api";
import {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RegisterPayload,
  RegisterResponse,
} from "./type";

export const AuthService = {
  async register(payload: RegisterPayload) {
    const { data } = await axiosRequest.post<ApiResponse<RegisterResponse>>(
      "/register",
      payload
    );
    return { data };
  },

  async login(payload: LoginPayload) {
    const { data } = await axiosRequest.post<ApiResponse<LoginResponse>>(
      "/login",
      payload
    );
    return { data };
  },

  async logout() {
    const { data } = await axiosRequest.post<ApiResponse<LogoutResponse>>(
      "/logout"
    );
    return { data };
  },
};
