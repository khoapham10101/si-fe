import { UserStatus } from "@/types/auth";
import { ApiPaginationResponse, ApiResponse } from "@/types/common";
import { User } from "@/types/user";

export type GetUsersResponse = ApiPaginationResponse<User[]>;

export interface GetListUserStatusPayload {
  filters: {
    name: string;
  };
}

export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  id_card: string;
  birthday: string | null;
  gender: number;
  id_1: string;
  id_2: string;
  avatar: string | null;
  phone: string;
  address: string;
  user_status_id: number;
  email: string;
  password: string;
}

export type CreateUserResponse = ApiResponse<User>;

export interface EditUserPayload extends Omit<CreateUserPayload, "password"> {
  password?: string;
}

export type EditUserResponse = ApiResponse<User>;
