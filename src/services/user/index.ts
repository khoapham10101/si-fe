import { ApiResponse, PaginationPayload } from "@/types/common";
import axiosRequest from "../api";
import {
  CreateUserPayload,
  CreateUserResponse,
  EditUserPayload,
  EditUserResponse,
  GetListUserStatusPayload,
  GetUsersResponse,
} from "./type";
import { UserStatus } from "@/types/auth";

export const UserService = {
  async getUsers(pagination?: PaginationPayload): Promise<GetUsersResponse> {
    const { data } = await axiosRequest.post<GetUsersResponse>(
      "/users",
      pagination && { pagination }
    );
    return data;
  },

  async getListUserStatus(
    payload: GetListUserStatusPayload
  ): Promise<ApiResponse<UserStatus[]>> {
    const { data } = await axiosRequest.post<ApiResponse<UserStatus[]>>(
      "/userStatus/dropdown",
      payload
    );
    return data;
  },

  async createUser(payload: CreateUserPayload): Promise<CreateUserResponse> {
    const { data } = await axiosRequest.post<CreateUserResponse>(
      "users/create",
      payload
    );
    return data;
  },

  async editUser(
    id: number,
    payload: EditUserPayload
  ): Promise<EditUserResponse> {
    const { data } = await axiosRequest.patch(`/users/update/${id}`, payload);
    return data;
  },

  async deleteUser(id: number): Promise<any> {
    return axiosRequest.delete(`/users/delete/${id}`);
  },
};
