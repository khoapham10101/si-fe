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
import { User } from "@/types/user";

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
    const formData = new FormData();
    formData.append("first_name", payload.first_name);
    formData.append("last_name", payload.last_name);
    formData.append("id_card", payload.id_card);
    formData.append("birthday", payload.birthday);
    formData.append("gender_id", payload.gender_id.toString());
    formData.append("id_1", payload.id_1);
    formData.append("id_2", payload.id_2);
    !!payload.avatar && formData.append("avatar", payload.avatar);
    formData.append("phone", payload.phone);
    formData.append("address", payload.address);
    formData.append("user_status_id", payload.user_status_id.toString());
    formData.append("email", payload.email);
    formData.append("password", payload.password);

    const { data } = await axiosRequest.post<CreateUserResponse>(
      "users/create",
      formData
    );
    return data;
  },

  async editUser(
    id: number,
    payload: EditUserPayload
  ): Promise<EditUserResponse> {
    const formData = new FormData();
    formData.append("first_name", payload.first_name);
    formData.append("last_name", payload.last_name);
    formData.append("id_card", payload.id_card);
    formData.append("birthday", payload.birthday);
    formData.append("gender_id", payload.gender_id.toString());
    formData.append("id_1", payload.id_1);
    formData.append("id_2", payload.id_2);
    !!payload.avatar && formData.append("avatar", payload.avatar);
    formData.append("phone", payload.phone);
    formData.append("address", payload.address);
    formData.append("user_status_id", payload.user_status_id.toString());
    formData.append("email", payload.email);

    const { data } = await axiosRequest.post(`/users/update/${id}`, formData);
    return data;
  },

  async deleteUser(id: number): Promise<any> {
    return axiosRequest.delete(`/users/delete/${id}`);
  },

  async getUserDetail(id: number): Promise<User> {
    const { data } = await axiosRequest.get<User>(`/users/single/${id}`);
    return data;
  },
};
